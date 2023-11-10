// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Col, Container, ProgressBar, Accordion } from "react-bootstrap";
import CourseModuleItem from "@/components/ui/course/CourseModuleItem";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import { useCourseProgressQuery } from "@/redux/api/courseProgressApi";
import { ICourseModule, IModuleContent, IUserCourseProgress } from "@/types";

const CourseModulePage = () => {
  const router = useRouter();

  const courseId = router?.query?.courseId;
  const moduleId = router?.query?.moduleId;
  const contentId = router?.query?.contentId;

  const { data, isLoading } = useCourseModulesQuery(courseId);
  const courseModules = data?.data as ICourseModule[];

  const pageModule = courseModules?.find(
    (module: ICourseModule) => module._id === moduleId
  );

  const pageContent = pageModule?.moduleContents?.find(
    (content: IModuleContent) => content._id === contentId
  );

  console.log(pageModule);

  const handleNextContentClick = () => {
    // const moduleContentRoute = `/course-modules?courseId=${courseId}&moduleId=${module._id}&contentKey=${contentKey}`;
    // router.push(moduleContentRoute);
  };

  const handlePreviousContentClick = () => {
    // const moduleContentRoute = `/course-modules?courseId=${courseId}&moduleId=${module._id}&contentKey=${contentKey}`;
    // router.push(moduleContentRoute);
  };

  return (
    <div>
      <div>
        <div className="text-start my-5">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
              <h2 className="fw-bold my-0">Backend Development Course</h2>
            </div>
            <Row>
              <Col className="col-12 col-lg-8 mb-4 mb-lg-0">
                <iframe
                  width="100%"
                  height="414"
                  src={pageContent?.link}
                  title="YouTube video player"
                />
                <div className="mt-3 d-flex flex-lg-row flex-column justify-content-between align-items-start">
                  <h4 className=" mb-0">{pageContent?.title}</h4>
                  <div className="mt-2 mt-lg-0">
                    <button
                      onClick={handlePreviousContentClick}
                      className="btn btn-outline-success rounded-pill me-2 moduleContentControlButtons"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextContentClick}
                      className="btn btn-success rounded-pill moduleContentControlButtons"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Col>

              <Col className="col-12 col-lg-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="mb-0 fw-bold">Course Progress</h5>
                  <ProgressBar
                    className="w-50 mb-0"
                    variant="success"
                    now={50}
                    label={`${50}%`}
                  />
                </div>
                <div className="moduleList">
                  <input
                    className="moduleSearchBar"
                    placeholder="Search for module"
                  ></input>

                  <div className="modules">
                    <Accordion defaultActiveKey="1">
                      {courseModules?.map((module: any) => (
                        <CourseModuleItem
                          key={module._id}
                          courseId={courseId as string}
                          module={module}
                        />
                      ))}
                    </Accordion>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CourseModulePage;

CourseModulePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
