/* eslint no-use-before-define: 0 */
// Imports
import React from "react";
import Link from "next/link";
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ILoginUser } from "@/types";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/router";
import swal from "sweetalert";
import { useAppDispatch } from "@/redux/hooks";
import { setCurrentUser } from "@/redux/slices/user/userSlice";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<ILoginUser | null>(null);
  const [userLogin] = useUserLoginMutation();

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof ILoginUser;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData as ILoginUser);
  };

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await userLogin({ ...loginData }).unwrap();

      // Redirecting to profile page
      if (res?.accessToken) {
        // Storing user access token in to keep user authenticated
        storeUserInfo({ accessToken: res?.accessToken });

        dispatch(setCurrentUser(res?.user));

        router.push("/");
        swal("Welcome back Brevemodian", "", "success");
      }

      e.currentTarget.reset();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section style={{ marginTop: 100, marginBottom: 150 }}>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-5 col-xl-5 mx-auto mb-4 mb-lg-0">
            <img src="/SignUp.svg" className="img-fluid" alt="Login Image" />
          </div>
          <div className="col-md-8 col-lg-5 col-xl-4 offset-xl-1 shadow-lg p-5 rounded-3 mx-auto">
            <form onSubmit={handleLoginSubmit}>
              <div className="form-floating mb-3">
                <input
                  onBlur={handleOnBlur}
                  name="email"
                  type="email"
                  className="form-control"
                  id="floatingLoginEmail"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="floatingLoginEmail">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="password"
                  type="password"
                  className="form-control"
                  id="floatingLoginPassword"
                  placeholder="Password"
                  required
                />
                <label htmlFor="floatingLoginPassword">Password</label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <Button className="w-100" type="submit" variant="primary">
                  Login <FontAwesomeIcon icon={faSignInAlt} />
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link href="/sign-up" className="link-danger ms-1">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
