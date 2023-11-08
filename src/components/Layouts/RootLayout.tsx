// Imports
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useUserProfileQuery } from "@/redux/api/profileApi";
import { useAppDispatch } from "../../redux/hooks";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect } from "react";
import { setCurrentUser } from "@/redux/slices/user/userSlice";
import { isLoggedIn } from "../../services/auth.service";

const RootLayout = ({ children }: any) => {
  // if (!isLoggedIn()) {
  //   return (
  //     <div>
  //       <Header />
  //       <div>{children}</div>
  //       <Footer />
  //     </div>
  //   );
  // }

  // const { data, isLoading } = useUserProfileQuery({});
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (data) {
  //     dispatch(setCurrentUser(data));
  //   }
  // }, [isLoading]);

  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
