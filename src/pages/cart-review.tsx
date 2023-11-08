// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import CartReviewItem from "@/components/ui/cart/CartReviewItem";

import Cart from "../components/ui/cart/Cart";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
const CartReviewPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { cart } = useAppSelector((state) => state.cart);

  const router = useRouter();

  return (
    <div className="container my-5">
      {cart && cart.courses.length ? (
        <div className="row g-5 mt-3">
          <div className="col-md-7 col-lg-8">
            <p className="text-center bg-dark text-white p-2 rounded-3">
              You added the following courses
              <FontAwesomeIcon className="mx-1" icon={faShoppingBag} />
            </p>
            {cart.courses.map((id) => (
              <CartReviewItem key={id} id={id} />
            ))}
          </div>

          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-dark">Your cart</span>
              <span className="badge bg-dark rounded-pill">
                {cart?.courses?.length}
              </span>
            </h4>

            <Cart cart={cart} />

            <div className="card p-2">
              <button
                onClick={() => router.push("/payment")}
                className="btn btn-success"
              >
                Checkout <FontAwesomeIcon icon={faAngleDoubleRight} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid my-5 mx-auto">
          <div className="row">
            <div className="col-md-12">
              <div className="shadow-sm p-4 rounded-3">
                <div className="card-body cart">
                  <div className="col-sm-12 empty-cart-cls text-center">
                    <Image
                      src="/EmptyCart.svg"
                      className="img-fluid mb-4 mr-3 col-6 col-lg-3"
                      alt=""
                    />
                    <h3 className="fw-light">Your Cart is Empty</h3>
                    <p className="m-0">Add a course to continue</p>
                    <button
                      className="btn btn-outline-primary mt-3"
                      data-abc="true"
                      onClick={() => router.push("/courses")}
                    >
                      Browse Courses
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartReviewPage;

CartReviewPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
