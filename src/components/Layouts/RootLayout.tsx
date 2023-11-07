// Imports
import ContextProvider from "@/context/ContextProvider";
import Header from "../ui/Header";
import Footer from "../ui/Footer";

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
