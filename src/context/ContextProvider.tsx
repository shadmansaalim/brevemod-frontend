import { createContext, ReactNode } from "react";
import useAuthApi from "@/hooks/auth/useAuthApi";
import { ILoginUser, ISignUpUser } from "@/hooks/auth/IAuth";

// Define the type for your context value
type AuthContextType = {
  currentUser: any;
  isLoading: boolean;
  signUpUser: (payload: ISignUpUser) => void;
  loginUser: (payload: ILoginUser) => void;
  logout: () => void;
};

// Define the default value for AuthContextType
const authContextDefault: AuthContextType = {
  currentUser: null,
  isLoading: false,
  signUpUser: () => {},
  loginUser: () => {},
  logout: () => {},
};

// Create the context with an initial value of null
export const AuthContext = createContext<AuthContextType>(authContextDefault);

type ContextProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({ children }: ContextProviderProps) => {
  const authContext = useAuthApi();

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default ContextProvider;
