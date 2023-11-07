// Imports
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignUp: build.mutation({
      query: (signUpData) => ({
        url: `${ENDPOINT_BASE_URL}/signup`,
        method: "POST",
        data: signUpData,
      }),
      invalidatesTags: [TAG_TYPES.user],
    }),
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${ENDPOINT_BASE_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [TAG_TYPES.user],
    }),
  }),
});

export const { useUserSignUpMutation, useUserLoginMutation } = authApi;
