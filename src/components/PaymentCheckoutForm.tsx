// Imports
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/auth/useAuth";
import { useRouter } from "next/router";
import { getTokenFromLocalStorage } from "@/utilities/common";
import swal from "sweetalert";

const PaymentCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser, setCurrentUser } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/purchases/create-payment-intent`, {
      method: "POST",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data?.data?.clientSecret));
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
        setError(intentError.message as string);
        setSuccess("");
        swal(intentError.message as string, "", "error");
      } else {
        setError("");
        setSuccess("Payment processed successfully");
        swal("Payment processed successfully", "", "success");
        console.log(paymentIntent);

        // Save to DB
        const payment = {
          courses: currentUser?.cart.courses,
          amount: paymentIntent?.amount,
          created: paymentIntent?.created,
          last4: paymentMethod?.card?.last4,
          transaction: paymentIntent?.client_secret?.slice(
            "_secret" as unknown as number
          )[0],
        };

        console.log(payment);

        fetch(`http://localhost:8080/api/v1/purchases`, {
          method: "POST",
          headers: {
            Authorization: getTokenFromLocalStorage(),
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              const user = result.data;
              setCurrentUser(user);
              setProcessing(false);
              router.push("/");
              reset();
            }
          });
      }
    }
  };

  return (
    <div className="row shadow-lg rounded-3 col-lg-8 mx-auto p-4">
      <div className="mb-4">
        <h2 className="fw-light">Provide Personal Details</h2>{" "}
        <span>
          Please provide your details in order to confirm subscription of
          courses.
        </span>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="card pay-card p-3">
          <h6 className="text-uppercase text-start">User Information</h6>
          <div className="inputbox mt-3">
            <input
              defaultValue={
                currentUser?.firstName +
                " " +
                (currentUser?.middleName || "") +
                " " +
                currentUser?.lastName
              }
              {...register("name")}
              className="form-control pay-control"
            />
            <span>Name</span>
          </div>
          <div className="inputbox mt-3">
            <input
              type="email"
              className="form-control pay-control"
              defaultValue={currentUser?.email}
              {...register("email", { required: true })}
            />
            <span>Email</span>
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="inputbox mt-3">
            <input
              type="number"
              className="form-control pay-control"
              defaultValue=""
              {...register("phone")}
              required
            />
            <span>Phone</span>
          </div>

          <div className="mt-3 mb-3">
            <h6 className="text-uppercase text-start">Billing Address</h6>
            <div className="row mt-2">
              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    className="form-control pay-control"
                    required
                    defaultValue=""
                    {...register("country")}
                  />
                  <span>Country</span>{" "}
                </div>
              </div>
              <div className="col-md-6">
                <div className="inputbox mt-3 mr-2">
                  <input
                    type="text"
                    className="form-control pay-control"
                    required
                    defaultValue=""
                    {...register("city")}
                  />
                  <span>City</span>{" "}
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
                <b>TEST</b> : 4242424242424242
              </small>
              <small>
                <b>TEST</b> : 04/50 123 45678
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
              onClick={() => router.push("/review")}
              className="btn btn-secondary px-3"
            >
              <FontAwesomeIcon icon={faBackward} /> Previous
            </button>
            {processing && !error ? (
              <button className="btn btn-primary" type="button" disabled>
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
                className="btn btn-primary px-3"
              >
                Pay ${currentUser?.cart.payment.grandTotal}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCheckoutForm;
