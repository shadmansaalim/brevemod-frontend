// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Row, Col, Container, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { ICourse } from "@/types";
import { useCoursesQuery } from "@/redux/api/courseApi";
import { useDebounced } from "@/redux/hooks";
import CoursesPageSkeleton from "@/components/ui/course/CoursesPageSkeleton";
import CourseCard from "../../components/ui/course/CourseCard";

const CoursesPage = () => {
  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const query: Record<string, any> = {};

  query["page"] = activePage;

  // Optimizing API call for user search
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm && searchTerm.length > 0) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useCoursesQuery({ ...query });
  const courses = data?.data as ICourse[];
  const meta = data?.meta;

  return (
    <>
      {isLoading ? (
        <CoursesPageSkeleton />
      ) : (
        <div>
          <div className="col-lg-6 mx-auto mt-5">
            <InputGroup
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
              className="mb-3"
            >
              <Form.Control
                value={searchTerm}
                placeholder="Search courses"
                aria-label="Search courses"
                aria-describedby="basic-addon1"
              />
              {searchTerm.length > 0 && (
                <InputGroup.Text
                  id="basic-addon1"
                  onClick={() => setSearchTerm("")}
                  style={{ cursor: "pointer" }}
                >
                  Reset <FontAwesomeIcon icon={faRotateLeft} className="ms-2" />
                </InputGroup.Text>
              )}
            </InputGroup>
          </div>

          <Container>
            <section>
              {searchTerm.length > 0 && courses.length === 0 ? (
                <Row
                  style={{ marginTop: "80px", marginBottom: "80px" }}
                  className="text-center"
                >
                  <Col lg="6" className="mx-auto shadow-lg mb-5 p-5 rounded-3">
                    <img
                      src="/Empty.svg"
                      className="img-fluid mb-3 col-6"
                      alt="Empty Cart Image"
                    />
                    <p>No Courses found based on your search results.</p>
                  </Col>
                </Row>
              ) : (
                <div>
                  <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
                    {courses?.map((course: ICourse) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </Row>
                  <div className="d-flex justify-content-end">
                    <nav aria-label="...">
                      <ul className="pagination">
                        {
                          <li
                            className={
                              activePage === 1
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <button
                              onClick={() => setActivePage(activePage - 1)}
                              className="page-link"
                              aria-label="Previous"
                            >
                              Previous
                            </button>
                          </li>
                        }
                        {[...Array(meta?.totalPage).keys()].map((number) => (
                          <li
                            key={number}
                            className={
                              number === activePage - 1
                                ? "page-item active"
                                : "page-item"
                            }
                          >
                            <button
                              onClick={() => setActivePage(number + 1)}
                              className="page-link"
                            >
                              {number + 1}
                            </button>
                          </li>
                        ))}
                        {
                          <li
                            className={
                              activePage === meta?.totalPage
                                ? "page-item disabled"
                                : "page-item"
                            }
                          >
                            <button
                              onClick={() => setActivePage(activePage + 1)}
                              className="page-link"
                              aria-label="Next"
                            >
                              Next
                            </button>
                          </li>
                        }
                      </ul>
                    </nav>
                  </div>
                </div>
              )}
            </section>
          </Container>
        </div>
      )}
    </>
  );
};

export default CoursesPage;

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
