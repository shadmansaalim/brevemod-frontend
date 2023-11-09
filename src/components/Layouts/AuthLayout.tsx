// Imports
import { isLoggedIn } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  // Getting whether user is logged in or not
  const userSession = isLoggedIn();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Redirecting to login page if user not authenticated
    if (!userSession) {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AuthLayout;
