// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/courses";

const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    courses: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ENDPOINT_BASE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.course],
    }),
  }),
});

export const { useCoursesQuery } = courseApi;
