// Imports
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useCreatePaymentIntentMutation,
  usePurchaseCoursesMutation,
} from "@/redux/api/purchaseApi";
import LoadingSpinner from "../LoadingSpinner";
import { setCart } from "@/redux/slices/cartSlice";

const PaymentCheckoutForm = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [purchaseCourses] = usePurchaseCoursesMutation();

  const stripe = useStripe();
  const elements = useElements();

  // States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreatePaymentIntent = async () => {
    try {
      const res = await createPaymentIntent({}).unwrap();
      if (res?.success) {
        setClientSecret(res.data.clientSecret);
      }
    } catch (err) {
      swal("Something went wrong", "", "error");
    }
  };

  const handlePurchaseCourses = async () => {
    setIsLoading(true);
    try {
      const res = await purchaseCourses({}).unwrap();
      if (res.success) {
        dispatch(setCart(null));
        router.push("/purchase-confirm");
      }
      setIsLoading(false);
    } catch (err) {
      swal(err.message, "", "error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCreatePaymentIntent();
  }, [currentUser]);

  const onSubmit = async (data: any) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    setProcessing(true);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message as string);
      swal(error.message as string, "", "error");
      setSuccess("");
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    //Payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      });

    if (paymentIntent) {
      if (intentError) {
        setError("Something went wrong!");
        setSuccess("");
        swal("Something went wrong!", "", "error");
      } else {
        setError("");
        setSuccess("Payment processed successfully");
        swal("Payment processed successfully", "", "success");
        console.log(paymentIntent);

        // Save to DB when creating invoice feature
        const payment = {
          courses: cart && cart.courses,
          amount: paymentIntent?.amount,
          created: paymentIntent?.created,
          last4: paymentMethod?.card?.last4,
          transaction: paymentIntent?.client_secret?.slice(
            "_secret" as unknown as number
          )[0],
        };

        await handlePurchaseCourses();
      }
    }
  };

  return (
    <>
      {currentUser && cart && !isLoading ? (
        <div className="row shadow-lg rounded-3 col-lg-8 mx-auto p-4">
          <div className="mb-4">
            <h2 className="fw-light">Provide Personal Details</h2>{" "}
            <span>
              Please provide your details in order to confirm subscription of
              courses.
            </span>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card pay-card p-3"
            >
              <h6 className="text-uppercase text-start">User Information</h6>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  className="form-control pay-control"
                />
                <label htmlFor="name">Name</label>
                {errors?.name && (
                  <small className="text-danger">Name is required</small>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="form-control pay-control"
                />
                <label htmlFor="email">Email</label>
                {errors?.email && (
                  <small className="text-danger">Email is required</small>
                )}
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  id="phone"
                  {...register("phone", { required: true })}
                  className="form-control pay-control"
                />
                <label htmlFor="phone">Phone</label>
                {errors?.phone && (
                  <small className="text-danger">Phone is required</small>
                )}
              </div>
              <div className="mt-3 mb-3">
                <h6 className="text-uppercase text-start">Billing Address</h6>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="country"
                        {...register("country", { required: true })}
                        className="form-control pay-control"
                      />
                      <label htmlFor="country">Country</label>
                      {errors?.country && (
                        <small className="text-danger">
                          Country is required
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        id="city"
                        {...register("city", { required: true })}
                        className="form-control pay-control"
                      />
                      <label htmlFor="city">City</label>
                      {errors?.city && (
                        <small className="text-danger">City is required</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 mb-3">
                <h6 className="text-uppercase mb-4 text-start">
                  Payment Information
                </h6>
                <span className="d-flex justify-content-between">
                  <small>
                    <b>Testing Card</b> : 4242424242424242
                  </small>
                  <small>
                    <b>Testing Info</b> : 04/50 123 45678
                  </small>
                </span>
                <div className="row mt-2">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="mt-4 mb-4 d-flex justify-content-between">
                <button
                  onClick={() => router.back()}
                  className="btn btn-secondary px-3"
                >
                  <FontAwesomeIcon icon={faBackward} /> Previous
                </button>
                {processing && !error ? (
                  <button className="btn btn-success" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!stripe || success ? true : false}
                    className="btn btn-success px-3"
                  >
                    Pay ${cart.payment.grandTotal}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default PaymentCheckoutForm;
