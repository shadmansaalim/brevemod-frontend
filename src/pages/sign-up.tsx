// Imports
import React from "react";
import Link from "next/link";
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useState } from "react";
import { useUserSignUpMutation } from "@/redux/api/authApi";
import { ISignUpUser, ResponseSuccessType } from "@/types";
import { useRouter } from "next/router";
import swal from "sweetalert";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState<ISignUpUser | null>(null);
  const [userSignUp] = useUserSignUpMutation();

  const router = useRouter();

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof ISignUpUser;
    const value = e.target.value;
    const newSignUpData = { ...signUpData };
    newSignUpData[field] = value;
    setSignUpData(newSignUpData as ISignUpUser);
  };

  const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res: ResponseSuccessType = await userSignUp({
        ...signUpData,
      }).unwrap();

      if (res?.success) {
        swal(res?.message, "Please login to continue", "success");
        router.push("/");
      }
    } catch (err) {
      swal(err.message, "", "error");
    }
  };

  return (
    <section className="my-5">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-10 mt-4">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center fw-bold mb-4 mb-lg-5 mx-1 mx-md-4 mt-4 mt-lg-0">
                      Sign Up and Start Learning from Today!
                    </p>

                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={handleSignUpSubmit}
                    >
                      <div className="form-outline flex-fill mb-4">
                        <input
                          onBlur={handleOnBlur}
                          name="firstName"
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          required
                        />
                      </div>

                      <div className="form-outline flex-fill mb-4">
                        <input
                          onBlur={handleOnBlur}
                          name="middleName"
                          type="text"
                          className="form-control"
                          placeholder="Middle Name"
                        />
                      </div>

                      <div className="form-outline flex-fill mb-4">
                        <input
                          onBlur={handleOnBlur}
                          name="lastName"
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          required
                        />
                      </div>

                      <div className="form-outline flex-fill mb-4">
                        <input
                          onBlur={handleOnBlur}
                          name="email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div className="form-outline flex-fill mb-4">
                        <input
                          onBlur={handleOnBlur}
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                      </div>

                      <div className="d-flex justify-content-center mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-success w-100">
                          Sign Up
                        </button>
                      </div>

                      <div className="text-center">
                        <span className="me-1">Already a member?</span>
                        <Link href="/login" className="text-success">
                          Login
                        </Link>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-2 mx-auto">
                    <img
                      src="/SignUp.svg"
                      className="img-fluid"
                      alt="Sign Up Image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
