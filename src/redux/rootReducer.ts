// Imports
import { baseApi } from "./api/baseApi";
import userReducer from "./slices/user/userSlice";

// Root Reducer
export const reducer = {
  user: userReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
