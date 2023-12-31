// Imports

// Styles
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/courseModule.scss";
import "@/styles/globals.css";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";

import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloClientOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { LocalStorageUtils } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

let persistor = persistStore(store);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {getLayout(<Component {...pageProps} />)}
      </PersistGate>
    </Provider>
  );
}
