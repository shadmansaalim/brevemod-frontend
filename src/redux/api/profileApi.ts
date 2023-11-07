// Imports
import { IUser } from "@/types";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/profile";

const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userProfile: build.query({
      query: () => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
        };
      },
      transformResponse: (response: IUser) => {
        return response;
      },
      providesTags: [TAG_TYPES.user],
    }),
  }),
});

export const { useUserProfileQuery } = profileApi;
