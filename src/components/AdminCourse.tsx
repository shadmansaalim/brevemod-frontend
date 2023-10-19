// Imports
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faForward } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ICourse, ICourseAddUpdateData } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import { getTokenFromLocalStorage } from "@/utilities/common";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminCourse = (props: {
  course: ICourse;
  courses: ICourse[];
  setCourses: (payload: ICourse[]) => void;
}) => {
  const { course, courses, setCourses } = props;
  const { currentUser, setCurrentUser } = useAuth();

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const [courseData, setCourseData] = useState<ICourseAddUpdateData | null>(
    null
  );
  const [updatingCourseData, setUpdatingCourseData] = useState(false);

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof ICourseAddUpdateData;
    const value =
      e.target.type === "number" ? parseFloat(e.target.value) : e.target.value;

    setCourseData((prevCourseData) => ({
      ...(prevCourseData as ICourseAddUpdateData),
      [field]: value,
    }));
  };

  const handleEditCourseDetails = (e: React.FormEvent<HTMLFormElement>) => {
    if (courseData) {
      setUpdatingCourseData(true);
      fetch(`http://localhost:8080/api/v1/courses/${course._id}`, {
        method: "PATCH",
        headers: {
          Authorization: getTokenFromLocalStorage(),
          "content-type": "application/json",
        },
        body: JSON.stringify(courseData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            const updatedCoursesData = courses.map((elem) => {
              if (elem._id === course._id) {
                return result.data;
              }
              return elem;
            });

            setCourses(updatedCoursesData);

            handleModalClose();
            swal(result.message, "", "success");
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setUpdatingCourseData(false));
    }

    e.preventDefault();
  };

  const handleRemoveCourse = () => {
    swal({
      title: "Are you sure?",
      text: "The course will be permanently removed from the system.",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:8080/api/v1/courses/${course._id}`, {
          method: "DELETE",
          headers: {
            Authorization: getTokenFromLocalStorage(),
            "content-type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              swal(result.message, "", "success");
            }
          });
      }
    });
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img src={course.thumbnailLink} className="card-img-top" alt="..." />
        <div className="card-body course d-flex flex-column justify-content-around">
          <p className="card-title fw-bold">{course.title}</p>
          <div className="card-text">
            <small>{course.instructorName}</small>

            <Modal show={modalShow} onHide={handleModalClose}>
              <form onSubmit={handleEditCourseDetails}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Edit Course Details
                    <FontAwesomeIcon
                      className="ms-2 text-secondary"
                      icon={faEdit}
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
                      defaultValue={course.title}
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
                      defaultValue={course.description}
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
                      defaultValue={course.instructorName}
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
                      defaultValue={course.price}
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
                      defaultValue={course.thumbnailLink}
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
                      defaultValue={course.introVideoLink}
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
                      defaultValue={course.lecturesCount}
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
                      defaultValue={course.projectsCount}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  {updatingCourseData ? (
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
                      Updating...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-secondary w-100">
                      Update
                      <FontAwesomeIcon className="ms-2" icon={faForward} />
                    </button>
                  )}
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
        <div className="card-footer ">
          <button
            className="btn btn-outline-dark w-100"
            onClick={handleModalShow}
          >
            Edit Course
            <FontAwesomeIcon className="ms-1" icon={faEdit} />
          </button>
          <button
            className="btn btn-outline-danger w-100 mt-2"
            onClick={handleRemoveCourse}
          >
            Remove Course
            <FontAwesomeIcon className="ms-1" icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourse;
