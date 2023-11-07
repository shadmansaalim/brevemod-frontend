// Imports
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import { useUserProfileQuery } from "@/redux/api/profileApi";
import { useAppDispatch } from "../../redux/hooks";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect } from "react";
import { setCurrentUser } from "@/redux/slices/user/userSlice";

const RootLayout = ({ children }: any) => {
  const { data, isLoading } = useUserProfileQuery({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCurrentUser(data));
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header />
          <div>{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default RootLayout;
