// Function to save user to local storage
const saveTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

// Function to get user from local storage
const getTokenFromLocalStorage = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    return JSON.parse(accessToken);
  } else {
    return null;
  }
};

// Function to remove user from local storage
const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("accessToken");
};

export {
  saveTokenToLocalStorage,
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
};
