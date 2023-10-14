//Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";

const HomePage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
