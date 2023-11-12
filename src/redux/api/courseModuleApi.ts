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
    isCourseContentPublished: build.query({
      query: (courseId: string | string[] | undefined) => ({
        url: `${ENDPOINT_BASE_URL}/content-published/${courseId}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.courseModule],
    }),
    isCourseContentValid: build.query({
      query: (arg) => ({
        url: `${ENDPOINT_BASE_URL}/content-valid/${arg.courseId}/${arg.moduleId}/${arg.contentId}`,
        method: "GET",
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      providesTags: [TAG_TYPES.courseModule],
    }),
    createModule: build.mutation({
      query: (moduleData) => ({
        url: ENDPOINT_BASE_URL,
        method: "POST",
        data: moduleData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),
    addContentToModule: build.mutation({
      query: (payload) => ({
        url: `${ENDPOINT_BASE_URL}/add-content/${payload.moduleId}`,
        method: "PATCH",
        data: payload.contentData,
      }),
      transformResponse: genericSuccessResponse,
      transformErrorResponse: genericErrorResponse,
      invalidatesTags: [TAG_TYPES.courseModule],
    }),
  }),
});

export const {
  useCourseModulesQuery,
  useIsCourseContentPublishedQuery,
  useIsCourseContentValidQuery,
  useCreateModuleMutation,
  useAddContentToModuleMutation,
} = courseModuleApi;
