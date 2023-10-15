import { AuthContext } from "@/context/ContextProvider";
import { useContext } from "react";

const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};

export default useAuth;
