// Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import Rating from "react-rating";
import { ICourse } from "@/interfaces/common";
import { getTokenFromLocalStorage } from "@/utilities/common";
import useAuth from "@/hooks/auth/useAuth";

const CartReviewItem = (props: { course: ICourse }) => {
  const { setCurrentUser } = useAuth();
  const { course } = props;

  const handleRemoveCourseFromCart = async () => {
    fetch(`http://localhost:8080/api/v1/cart/remove-from-cart/${course._id}`, {
      method: "PATCH",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const userData = data.data;
        setCurrentUser(userData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      style={{ borderBottom: "1px solid lightgray" }}
      className="d-flex
        flex-column flex-lg-row me-2 text-dark p-2 rounded-3 mb-1 justify-content-around align-items-center"
    >
      <div>
        <img
          className="img-fluid rounded-3"
          src={course.thumbnailLink}
          alt=""
          style={{ height: 130 }}
        />
      </div>
      <div
        style={{ width: "70%" }}
        className="mt-2 mt-lg-0 d-flex d-md-block flex-column justify-content-center text-center"
      >
        <h6 className="m-0">{course.title}</h6>
        <small>{course.instructorName}</small>
        <div className="d-flex justify-content-center mt-1">
          <span className="me-1 rating">{course.avgRating}</span>
          <Rating
            className="me-1"
            initialRating={course.avgRating}
            emptySymbol={<FontAwesomeIcon icon={faStar} color="whitesmoke" />}
            fullSymbol={<FontAwesomeIcon icon={faStar} color="gold" />}
            readonly
          ></Rating>
          <small>(54,543)</small>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <h5 className="fw-bold">${course.price}</h5>
        </div>
        <button
          onClick={handleRemoveCourseFromCart}
          className="btn btn-outline-danger"
        >
          Remove <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default CartReviewItem;
