// Imports
import Rating from "react-rating";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faStar,
  faForward,
  faBan,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ICourse } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import CookingGif from "@/assets/images/Cooking.gif";
import { getTokenFromLocalStorage } from "@/utilities/common";
import Image from "next/image";

const MyCourse = (props: { course: ICourse }) => {
  const { course } = props;
  const { currentUser, setCurrentUser } = useAuth();

  const [rating, setRating] = useState<number>(0.0);
  const [words, setWords] = useState<string>("");

  const [firstModalShow, setFirstModalShow] = useState(false);
  const [secondModalShow, setSecondModalShow] = useState(false);

  const handleFirstModalClose = () => setFirstModalShow(false);
  const handleFirstModalShow = () => setFirstModalShow(true);

  const handleSecondModalClose = () => setSecondModalShow(false);
  const handleSecondModalShow = () => setSecondModalShow(true);

  const handleAddReviewToCourse = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0.0) {
      swal("Please provide a rating", "", "warning");
    } else {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/course-reviews/${course._id}`,
        {
          method: "POST",
          headers: {
            Authorization: getTokenFromLocalStorage(),
            "content-type": "application/json",
          },
          body: JSON.stringify({ rating, words }),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            handleFirstModalClose();
            handleSecondModalClose();
            swal(result.message, "", "success");
          }
        });
    }
  };

  const handleCancelEnrollment = () => {
    swal({
      title: "Are you sure?",
      text: "Once we cancel your enrollment, you will lose all your progress and not even get a refund for your course purchase.",
      icon: "warning",
      buttons: ["No", "Yes"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/purchases/cancel-enrollment/${course._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: getTokenFromLocalStorage(),
              "content-type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if (result.success) {
              setCurrentUser(result.data);
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
                  <p>Please write your review words here about this course.</p>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingServiceDescription"
                      style={{ height: "100px" }}
                      name="words"
                      required
                      onBlur={(e) => setWords(e.target.value)}
                    ></textarea>
                    <label htmlFor="floatingServiceDescription">Words</label>
                  </div>
                  <div className="text-start">
                    <Rating
                      className="fs-3"
                      emptySymbol={
                        <FontAwesomeIcon icon={faStar} color="whitesmoke" />
                      }
                      fullSymbol={
                        <FontAwesomeIcon icon={faStar} color="gold" />
                      }
                      fractions={2}
                      value={rating}
                      onChange={(value: number) => {
                        setRating(value);
                      }}
                    ></Rating>
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
        <div className="card-footer ">
          <button
            className="btn btn-outline-dark w-100"
            onClick={handleFirstModalShow}
          >
            Continue Course
            <FontAwesomeIcon className="ms-1" icon={faForward} />
          </button>
          <button
            className="btn btn-outline-danger w-100 mt-2"
            onClick={handleCancelEnrollment}
          >
            Cancel Enrollment
            <FontAwesomeIcon className="ms-1" icon={faBan} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
