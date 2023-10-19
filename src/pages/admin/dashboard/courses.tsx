// Imports
import AdminDashboardLayout from "@/components/Layouts/AdminDashboardLayout";
import type { ReactElement } from "react";
import { Row, Container, InputGroup, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { ICourse, ICourseAddUpdateData, IMetaData } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import AdminCourse from "../../../components/AdminCourse";
import { getTokenFromLocalStorage } from "@/utilities/common";
import swal from "sweetalert";
import { faForward } from "@fortawesome/free-solid-svg-icons";

const AdminDashboardCoursesPage = () => {
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

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const [courseData, setCourseData] = useState<ICourseAddUpdateData | null>(
    null
  );
  const [creatingCourse, setCreatingCourse] = useState(false);

  const handleOnBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = e.target.name as keyof ICourseAddUpdateData;
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;
    setCourseData((prevCourseData) => ({
      ...(prevCourseData as ICourseAddUpdateData),
      [field]: value,
    }));
  };

  const handleAddNewCourse = (e: React.FormEvent<HTMLFormElement>) => {
    if (courseData) {
      setCreatingCourse(true);
      fetch(`http://localhost:8080/api/v1/courses`, {
        method: "POST",
        headers: {
          Authorization: getTokenFromLocalStorage(),
          "content-type": "application/json",
        },
        body: JSON.stringify(courseData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            handleModalClose();
            swal(result.message, "", "success");
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setCreatingCourse(false));
    }

    e.preventDefault();
  };

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
        <div className="text-center">
          <button onClick={handleModalShow} className="btn btn-success">
            Add New Course
            <FontAwesomeIcon className="ms-2" icon={faPlusCircle} />
          </button>
        </div>

        <Modal show={modalShow} onHide={handleModalClose}>
          <form onSubmit={handleAddNewCourse}>
            <Modal.Header closeButton>
              <Modal.Title>
                Add Course Details
                <FontAwesomeIcon
                  className="ms-2 text-secondary"
                  icon={faPlusCircle}
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="title"
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="description"
                  type="text"
                  className="form-control"
                  placeholder="Description"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="instructorName"
                  type="text"
                  className="form-control"
                  placeholder="Instructor Name"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="price"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Price"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="thumbnailLink"
                  type="text"
                  className="form-control"
                  placeholder="Thumbnail Link"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="introVideoLink"
                  type="text"
                  className="form-control"
                  placeholder="Intro Video Link"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="lecturesCount"
                  type="number"
                  className="form-control"
                  placeholder="Lectures Count"
                  required
                />
              </div>
              <div className="form-outline flex-fill mb-4">
                <input
                  onBlur={handleOnBlur}
                  name="projectsCount"
                  type="number"
                  className="form-control"
                  placeholder="Projects Count"
                  required
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              {creatingCourse ? (
                <button
                  className="btn btn-secondary w-100"
                  type="button"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating...
                </button>
              ) : (
                <button type="submit" className="btn btn-secondary w-100">
                  Create
                  <FontAwesomeIcon className="ms-2" icon={faForward} />
                </button>
              )}
            </Modal.Footer>
          </form>
        </Modal>
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
                  <AdminCourse
                    key={course._id}
                    course={course}
                    courses={courses}
                    setCourses={setCourses}
                  ></AdminCourse>
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

export default AdminDashboardCoursesPage;

AdminDashboardCoursesPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
