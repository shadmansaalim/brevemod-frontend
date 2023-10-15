// Imports
import ContextProvider from "@/context/ContextProvider";
import Header from "../shared/Header";

const RootLayout = ({ children }: any) => {
  return (
    <ContextProvider>
      <Header />
      <div>{children}</div>
    </ContextProvider>
  );
};

export default RootLayout;
