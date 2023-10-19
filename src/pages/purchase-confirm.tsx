// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import PurchaseConfirmImage from "../assets/images/PurchaseConfirm.svg";
import { useRouter } from "next/router";
import Image from "next/image";

const PurchaseConfirmationPage = () => {
  const router = useRouter();
  return (
    <div className="text-center my-5 col-9 col-md-8 col-lg-6 mx-auto">
      <Image
        src={PurchaseConfirmImage}
        className="img-fluid col-8 col-md-6 mx-auto mb-4"
        alt="Payment Image"
      />
      <h1 className="display-3"> Thank You!</h1>
      <p className="lead">
        <strong className="ms-1">Course Purchased Successfully</strong> Please
        check your email for subscription details. Check carefully it might be
        on your spam folder. You will now be able to see course details on
        <strong className="ms-1">Dashboard</strong>
      </p>
      <hr></hr>
      <p>
        Having trouble?
        <a
          className="ms-1"
          target="_blank"
          rel="noreferrer"
          href="https://github.com/shadmansaalim"
        >
          Contact us
        </a>
      </p>
      <p className="lead">
        <button
          onClick={() => router.push("/dashboard")}
          className="btn btn-outline-primary"
        >
          Dashboard
        </button>
      </p>
    </div>
  );
};

export default PurchaseConfirmationPage;

PurchaseConfirmationPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
