// Imports
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import ApolloLayout from "./ApolloLayout";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloLayout>
      <Header />
      <div className="main">{children}</div>
      <Footer />
    </ApolloLayout>
  );
};

export default RootLayout;
