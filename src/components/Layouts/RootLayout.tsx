// Imports
import ContextProvider from "@/context/ContextProvider";
import Footer from "../shared/Footer";
import Header from "../shared/Header";

const RootLayout = ({ children }: any) => {
  return (
    <ContextProvider>
      <Header />
      <div>{children}</div>
      <Footer />
    </ContextProvider>
  );
};

export default RootLayout;
