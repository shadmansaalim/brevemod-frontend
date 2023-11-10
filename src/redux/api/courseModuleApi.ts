// Imports
import {
  genericErrorResponse,
  genericSuccessResponse,
} from "@/helpers/api/api-response";
import { TAG_TYPES } from "../tag-types";
import { baseApi } from "./baseApi";

// Constant for this api routes
const ENDPOINT_BASE_URL = "/course-modules";

const courseModuleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    courseModules: build.query({
      query: (courseId: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/${courseId}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.courseModule],
    }),
  }),
});

export const { useCourseModulesQuery } = courseModuleApi;
