// Imports
import RootLayout from "../components/layouts/RootLayout";
import type { ReactElement } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckoutForm from "../components/PaymentCheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PaymentPage = () => {
  return (
    <div className="container my-5">
      <Elements stripe={stripePromise}>
        <PaymentCheckoutForm />
      </Elements>
    </div>
  );
};

export default PaymentPage;

PaymentPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
