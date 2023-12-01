// Imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloClientOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { LocalStorageUtils } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useEffect } from "react";

const ApolloLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apolloClientArgs, setApolloClientArgs] = useState<
    ApolloClientOptions<NormalizedCacheObject>
  >({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
  });

  useEffect(() => {
    const accessToken = LocalStorageUtils.get(authKey);
    if (accessToken) {
      const newArgs = { ...apolloClientArgs };
      newArgs.headers = {
        "Content-Type": "application/json",
        Authorization: accessToken,
      };
      setApolloClientArgs(newArgs);
    }
    setIsLoading(false);
  }, [currentUser]);

  const client = new ApolloClient(apolloClientArgs);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloLayout;
