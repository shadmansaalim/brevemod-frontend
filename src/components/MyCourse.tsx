// Imports
import Image from "next/image";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ICourse } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import CookingGif from "../assets/images/Cooking.gif";

const MyCourse = (props: { course: ICourse }) => {
  const { course } = props;
  const { currentUser } = useAuth();
  const [value, setValue] = useState(0);
  //   const [reviewData, setReviewData] = useState({
  //     name: user?.displayName,
  //     feedback: "",
  //   });

  const [firstModalShow, setFirstModalShow] = useState(false);
  const [secondModalShow, setSecondModalShow] = useState(false);

  const handleFirstModalClose = () => setFirstModalShow(false);
  const handleFirstModalShow = () => setFirstModalShow(true);

  const handleSecondModalClose = () => setSecondModalShow(false);
  const handleSecondModalShow = () => setSecondModalShow(true);

  const handleOnBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const field = e.target.name;
    // const value = e.target.value;
    // const newReviewData = { ...reviewData };
    // newReviewData[field] = value;
    // setReviewData(newReviewData);
  };

  const handleAddReviewToCourse = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="col">
      <div className="card h-100">
        <img src={course.thumbnailLink} className="card-img-top" alt="..." />
        <div className="card-body course d-flex flex-column justify-content-around">
          <p className="card-title fw-bold">{course.title}</p>
          <div className="card-text">
            <small>{course.instructorName}</small>
            <br />
            <div className="progress col-10 mx-auto mt-2">
              <div
                className="progress-bar "
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                25%
              </div>
            </div>

            <Modal show={firstModalShow} onHide={handleFirstModalClose}>
              <Modal.Header closeButton>
                <h6>{course.title}</h6>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                <Image
                  src={CookingGif}
                  className="img-fluid"
                  alt="Cooking Gif"
                />
                <p className="mb-1 fw-bold">Course Module Not Cooked Yet</p>
                <small>
                  Pro Tips: You can do some practice until the new module is
                  released.
                </small>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleFirstModalClose();
                    handleSecondModalShow();
                  }}
                >
                  <FontAwesomeIcon icon={faPen} /> Add Review
                </button>
              </Modal.Footer>
            </Modal>

            <Modal show={secondModalShow} onHide={handleSecondModalClose}>
              <form onSubmit={handleAddReviewToCourse}>
                <Modal.Header closeButton>
                  <Modal.Title>Drop a review about this course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p>Please enter your feedback here</p>
                  <div className="form-floating mb-3">
                    <input
                      defaultValue=""
                      className="form-control"
                      id="floatingServiceName"
                      required
                      type="text"
                      name="name"
                      onBlur={handleOnBlur}
                    />
                    <label htmlFor="floatingServiceName">
                      <small>Your Name</small>
                    </label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingServiceDescription"
                      style={{ height: "100px" }}
                      name="feedback"
                      onBlur={handleOnBlur}
                    ></textarea>
                    <label htmlFor="floatingServiceDescription">Feedback</label>
                  </div>
                  <div className="text-start">
                    {/* <Rating
                      className="fs-3"
                      emptySymbol="far fa-star icon-color"
                      fullSymbol="fas fa-star icon-color"
                      fractions={2}
                      value={value}
                      onChange={(value) => {
                        setValue(value);
                      }}
                    ></Rating> */}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </Modal.Footer>
              </form>
            </Modal>
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-outline-dark rounded-pill"
            onClick={handleFirstModalShow}
          >
            Continue Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
