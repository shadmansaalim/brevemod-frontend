// Imports
import Header from "../shared/Header";

const RootLayout = ({ children }: any) => {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default RootLayout;
