// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import {
  useCourseProgressQuery,
  useUpdateCourseProgressMutation,
} from "@/redux/api/courseProgressApi";
import {
  IContentRouteData,
  ICourseModule,
  IModuleContent,
  IUserCourseProgress,
  ResponseSuccessType,
} from "@/types";
import swal from "sweetalert";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import ContentView from "@/components/ui/course/course-content/ContentView";
import ContentSidebar from "@/components/ui/course/course-content/ContentSidebar";
import {
  findNextContentRoute,
  findPreviousContentRoute,
  isUserProgressUpdateRequired,
} from "@/utils/course-content";
import CourseContentLayout from "@/components/Layouts/CourseContentLayout";
import { ENUM_USER_ROLES } from "@/enums/user";
import CourseModulePageSkeleton from "@/components/ui/course/course-content/skeletons/CourseModulePageSkeleton";

const CourseModulePage = () => {
  const router = useRouter();

  // Extracting courseId, moduleId and courseId
  const courseId = router?.query?.courseId;
  const moduleId = router?.query?.moduleId;
  const contentId = router?.query?.contentId;

  // Current User
  const { currentUser } = useAppSelector((state) => state.user);

  // States
  const [nextContentRoute, setNextContentRoute] =
    useState<IContentRouteData | null>(null);
  const [previousContentRoute, setPreviousContentRoute] =
    useState<IContentRouteData | null>(null);
  const [userProgressUpdateRequired, setUserProgressUpdateRequired] =
    useState(false);

  // User Course Progress Data
  const { data: courseProgressData, isLoading: courseProgressDataLoading } =
    currentUser && currentUser.role === ENUM_USER_ROLES.STUDENT
      ? useCourseProgressQuery(courseId)
      : { data: null, isLoading: false };
  const courseProgress = courseProgressData?.data as IUserCourseProgress;

  // Course Modules
  const { data: courseModulesData, isLoading: courseModulesDataLoading } =
    useCourseModulesQuery(courseId);
  const courseModules = courseModulesData?.data as ICourseModule[];

  // Update Course Progress Hook
  const [updateCourseProgress] = useUpdateCourseProgressMutation();

  // Current Module
  const currentModule = courseModules?.find(
    (module: ICourseModule) => module._id === moduleId
  );

  // Current Content
  const currentContent = currentModule?.moduleContents?.find(
    (content: IModuleContent) => content._id === contentId
  );

  useEffect(() => {
    if (courseId && currentModule && currentContent) {
      setNextContentRoute(
        findNextContentRoute(
          currentUser?.role as ENUM_USER_ROLES,
          courseModules,
          currentModule,
          courseId as string,
          currentContent._id
        )
      );
      setPreviousContentRoute(
        findPreviousContentRoute(
          currentUser?.role as ENUM_USER_ROLES,
          courseModules,
          currentModule,
          courseId as string,
          currentContent._id
        )
      );
    }
    if (courseProgress && currentModule && currentContent) {
      setUserProgressUpdateRequired(
        isUserProgressUpdateRequired(
          courseProgress,
          currentModule._id,
          currentContent._id
        )
      );
    }
  }, [courseModulesData, courseProgressData]);

  const handleNextContentClick = async () => {
    if (nextContentRoute) {
      // Route Pattern
      const routePattern = `${nextContentRoute.initial}/${nextContentRoute.courseId}/[${nextContentRoute.moduleId}]/[${nextContentRoute.contentId}]`;
      // Route actual URL
      const routeUrl = `${nextContentRoute.initial}/${nextContentRoute.courseId}/${nextContentRoute.moduleId}/${nextContentRoute.contentId}`;

      // Checking if user progress update is required
      if (userProgressUpdateRequired) {
        try {
          const res: ResponseSuccessType = await updateCourseProgress(
            courseId
          ).unwrap();
          if (res?.success) {
            router.push(routePattern, routeUrl);
          }
        } catch (err) {
          swal(err.message, "", "error");
        }
      } else {
        router.push(routePattern, routeUrl);
      }
    }
  };

  const handlePreviousContentClick = () => {
    if (previousContentRoute) {
      router.push(
        `${previousContentRoute.initial}/${previousContentRoute.courseId}/[${previousContentRoute.moduleId}]/[${previousContentRoute.contentId}]`,
        `${previousContentRoute.initial}/${previousContentRoute.courseId}/${previousContentRoute.moduleId}/${previousContentRoute.contentId}`
      );
    }
  };

  return (
    <div>
      {courseModulesDataLoading || courseProgressDataLoading ? (
        <CourseModulePageSkeleton />
      ) : (
        <div>
          <div className="text-start my-5">
            <Container>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
                <h2 className="fw-bold my-0">Backend Development Course</h2>
              </div>
              <Row>
                <ContentView
                  currentContent={currentContent as IModuleContent}
                  isPreviousButtonDisabled={
                    previousContentRoute === null ? true : false
                  }
                  handlePreviousContentClick={handlePreviousContentClick}
                  isNextButtonDisabled={
                    nextContentRoute === null ? true : false
                  }
                  handleNextContentClick={handleNextContentClick}
                />
                <ContentSidebar
                  courseProgress={courseProgress}
                  modules={courseModules}
                  courseId={courseId as string}
                  defaultActiveKey={currentModule?._id as string}
                />
              </Row>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseModulePage;

CourseModulePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout onlyStudentAccess={true}>
      <RootLayout>
        <CourseContentLayout>{page}</CourseContentLayout>
      </RootLayout>
    </AuthLayout>
  );
};
