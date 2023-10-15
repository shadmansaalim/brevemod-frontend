// Imports
import { useState, useEffect } from "react";
import {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../utilities/common";
import { useRouter } from "next/router";
import { ILoginUser, ISignUpUser } from "./IAuth";
import swal from "sweetalert";
import { IUser } from "@/interfaces/common";

const useAuthApi = () => {
  // Current user states
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  //Loading states
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Function to get user profile from db
  const getUserDataFromDb = async (token: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/profile`, {
        headers: {
          Authorization: token,
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error("Error while fetching data:", response.status);
        return null;
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return null;
    }
  };

  // Keeping the user stored even after reload
  useEffect(() => {
    const fetchUser = async () => {
      const token = getTokenFromLocalStorage();

      if (token) {
        const user = await getUserDataFromDb(token);
        if (user) {
          console.log(user);
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    };
    fetchUser().catch(console.error);
  }, []);

  // Function to sign-up user in DB
  const signUpUser = async (payload: ISignUpUser) => {
    // Creating the user
    fetch("http://localhost:8080/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push("/");
        swal(data.message, "", "success");
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  // Function to login user
  const loginUser = async (payload: ILoginUser) => {
    fetch("http://localhost:8080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentUser(data.data.user);
        saveTokenToLocalStorage(data.data.accessToken);
        router.push("/");
        swal(data.message, "", "success");
      })
      .catch((error) => console.log(error));
  };

  // Function to logout current user
  const logoutUser = () => {
    // Removing the current user from local storage
    removeTokenFromLocalStorage();
    setCurrentUser(null);
  };

  return {
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    signUpUser,
    loginUser,
    logoutUser,
  };
};

export default useAuthApi;
