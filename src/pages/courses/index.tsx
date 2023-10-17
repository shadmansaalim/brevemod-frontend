// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import Course from "@/components/Course";
import { Row, Container, InputGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ICourse, IMetaData } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CoursesPage = () => {
  const { isLoading, setIsLoading } = useAuth();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [metaData, setMetaData] = useState<IMetaData>({
    page: 1,
    limit: 0,
    total: 0,
    totalPage: 0,
  });
  const [activePage, setActivePage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:8080/api/v1/courses?searchTerm=${searchTerm}&page=${activePage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.data);
        setMetaData(data.meta);
        setActivePage(data.meta.page);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [activePage, searchTerm]);

  return (
    <>
      <div className="col-lg-6 mx-auto mt-5">
        <InputGroup
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          className="mb-3"
        >
          <InputGroup.Text id="basic-addon1">
            <FontAwesomeIcon icon={faSearch} />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search courses"
            aria-label="Search courses"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
      {isLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <Container>
          <section>
            <div>
              <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
                {courses?.map((course) => (
                  <Course key={course._id} course={course}></Course>
                ))}
              </Row>
              <div className="d-flex justify-content-end">
                <nav aria-label="...">
                  <ul className="pagination">
                    {
                      <li
                        className={
                          activePage === 1 ? "page-item disabled" : "page-item"
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
                    {[...Array(metaData?.totalPage).keys()].map((number) => (
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
                          activePage === metaData?.totalPage
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
          </section>
        </Container>
      )}
    </>
  );
};

export default CoursesPage;

CoursesPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
