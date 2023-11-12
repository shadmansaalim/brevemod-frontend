// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Row, Col, Container, ProgressBar, Accordion } from "react-bootstrap";
import CourseModuleItem from "@/components/ui/course/course-content/CourseModuleItem";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCourseModulesQuery } from "@/redux/api/courseModuleApi";
import {
  useCourseProgressQuery,
  useUpdateCourseProgressMutation,
} from "@/redux/api/courseProgressApi";
import {
  ICourseModule,
  IModuleContent,
  IUserCourseProgress,
  ResponseSuccessType,
} from "@/types";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderPlus,
  faSquarePlus,
  faStar,
  faFolder,
  faUsers,
  faUserGraduate,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddModuleModal from "@/components/ui/course/course-content/AddModuleModal";
import { useAppSelector } from "@/redux/hooks";
import { ENUM_USER_ROLES } from "@/enums/user";

const CourseModulePage = () => {
  const router = useRouter();
  const { currentUser } = useAppSelector((state) => state.user);

  const courseId = router?.query?.courseId;

  const { data, isLoading } = useCourseModulesQuery(courseId);
  const courseModules = data?.data as ICourseModule[];

  const [addModuleModalShow, setAddModuleModalShow] = useState(false);

  return (
    <div>
      <div>
        <div className="text-start my-5">
          <Container>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start mb-4">
              <h2 className="fw-bold my-0">Backend Development Course</h2>
            </div>
            <Row>
              <Col className="col-12 col-lg-8">
                <div className="row g-3 text-white h-100">
                  <div className="col-lg-6">
                    <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100 bg-secondary">
                      <div className="col-8">
                        <h3 className="fw-bold fs-2 m-0">24</h3>
                        <p className="m-0">Students</p>
                      </div>
                      <span className="col-4 text-start">
                        <FontAwesomeIcon
                          icon={faUserGraduate}
                          className="primary-text border rounded-full secondary-bg p-3 m-0"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div
                      className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100"
                      style={{ background: "#dae5e0" }}
                    >
                      <div className="col-8">
                        <h3 className="fw-bold fs-2 m-0">13</h3>
                        <p className="m-0">Modules</p>
                      </div>
                      <span className="col-4 text-start">
                        <FontAwesomeIcon
                          icon={faFolder}
                          className="primary-text border rounded-full secondary-bg p-3 m-0"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div
                      className="p-4  shadow-sm d-flex justify-content-around align-items-center rounded h-100"
                      style={{ background: "#dae5e0" }}
                    >
                      <div className="col-8">
                        <h3 className="fw-bold fs-2 m-0">23</h3>
                        <p className="m-0">Contents</p>
                      </div>
                      <span className="col-4 text-start">
                        <FontAwesomeIcon
                          icon={faFile}
                          className="primary-text border rounded-full secondary-bg p-3 m-0"
                        />
                      </span>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded h-100 bg-secondary">
                      <div className="col-8">
                        <h3 className="fw-bold fs-2 m-0">4</h3>
                        <p className="m-0">Reviews</p>
                      </div>
                      <span className="col-4 text-start">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="primary-text border rounded-full secondary-bg p-3 m-0"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </Col>

              <Col className="col-12 col-lg-4">
                {/* <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="mb-0 fw-bold">Course Progress</h5>
                  <ProgressBar
                    className="w-50 mb-0"
                    variant="success"
                    now={courseProgress?.percentage || 0}
                    label={`${courseProgress?.percentage || 0}%`}
                  />
                </div> */}
                <div className="moduleList">
                  <input
                    className="moduleSearchBar"
                    placeholder="Search for module"
                  ></input>

                  <div className="modules">
                    <Accordion defaultActiveKey="1">
                      {courseModules?.map((module: any) => (
                        <CourseModuleItem
                          userRole={currentUser?.role as ENUM_USER_ROLES}
                          key={module._id}
                          courseId={courseId as string}
                          module={module}
                        />
                      ))}

                      {currentUser?.role === ENUM_USER_ROLES.ADMIN && (
                        <>
                          <button
                            onClick={() => setAddModuleModalShow(true)}
                            className="btn btn-dark w-100"
                          >
                            Add Module
                            <FontAwesomeIcon
                              className="ms-2"
                              icon={faFolderPlus}
                            />
                          </button>
                          <AddModuleModal
                            courseId={courseId}
                            modalShow={addModuleModalShow}
                            setModalShow={setAddModuleModalShow}
                          />
                        </>
                      )}
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
    <AuthLayout onlyAdminAccess={true}>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
