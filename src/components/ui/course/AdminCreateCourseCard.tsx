// Imports
import { Card, Col, Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { ICourse, ResponseSuccessType } from "@/types";
import { useCreateCourseMutation } from "@/redux/api/courseApi";
import swal from "sweetalert";

const AdminCreateCourseCard = () => {
  const [modalShow, setModalShow] = useState<boolean>(false);

  // Add Course Hook
  const [createCourse] = useCreateCourseMutation();

  // States
  const [courseData, setCourseData] = useState<ICourse | null>(null);
  const [courseCreating, setCourseCreating] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    const field = e.target.name as keyof ICourse;
    let value: string | number | undefined = e.target.value;

    if (field === "price") {
      value = e.target.value !== "" ? parseFloat(e.target.value) : undefined;
    }

    if (field === "lecturesCount" || field === "projectsCount") {
      value = e.target.value !== "" ? parseInt(e.target.value) : undefined;
    }
    const newCourseData = { ...courseData, [field]: value };
    setCourseData(newCourseData as ICourse);
  };

  const handleCreateCourse = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCourseCreating(true);
    try {
      const res: ResponseSuccessType = await createCourse({
        ...courseData,
      }).unwrap();
      if (res?.success) {
        swal(res.message, "", "success");
        setCourseCreating(false);
        setCourseData(null);
        setModalShow(false);
      }
    } catch (err: any) {
      setCourseCreating(false);
      swal(err?.message, "", "error");
    }
  };

  return (
    <Col className="text-center">
      <Card
        className="h-100"
        style={{
          background: "#dae5e0",
          borderColor: "#dae5e0",
          minHeight: "420.688px",
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-center">
          <Card.Title>Create New Course</Card.Title>
          <div>
            <Button
              onClick={() => setModalShow(true)}
              variant="success"
              size="lg"
              className="rounded-3"
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>

            <Modal show={modalShow} onHide={() => setModalShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>New Course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleCreateCourse}>
                  <FloatingLabel
                    controlId="title"
                    label="Course Title"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="title"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Course Title"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="description"
                    label="Course Description"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="description"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Course Description"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="instructorName"
                    label="Instructor Name"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="instructorName"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Instructor Name"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="price"
                    label="Course Price"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="price"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Course Price"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="thumbnailLink"
                    label="Thumbnail Link"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="thumbnailLink"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Thumbnail Link"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="introVideoLink"
                    label="Intro Video Link"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="introVideoLink"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Intro Video Link"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="lecturesCount"
                    label="Total Lectures"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="lecturesCount"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Total Lectures"
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="projectsCount"
                    label="Total Projects"
                    className="mb-3"
                  >
                    <Form.Control
                      required
                      name="projectsCount"
                      type="text"
                      onChange={handleOnChange}
                      placeholder="Total Projects"
                    />
                  </FloatingLabel>
                  {courseCreating ? (
                    <button className="btn btn-success w-100 mt-3" disabled>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Creating ...
                    </button>
                  ) : (
                    <button
                      className="btn btn-success mt-3 w-100"
                      type="submit"
                    >
                      Create Course
                    </button>
                  )}
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminCreateCourseCard;
