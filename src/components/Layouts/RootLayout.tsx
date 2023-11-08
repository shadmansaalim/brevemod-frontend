// Imports
import Header from "../ui/Header";
import Footer from "../ui/Footer";

const RootLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default RootLayout;
