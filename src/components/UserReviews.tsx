// Imports
import { ICourseReview } from "@/interfaces/common";
import { Col, Card } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faStar } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";

const UserReviews = (props: { reviews: ICourseReview[] }) => {
  const { reviews } = props;
  const slideCount = reviews.length < 2 ? 1 : 2;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slideCount,
    slidesToScroll: slideCount,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slideCount,
          slidesToScroll: slideCount,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container pt-2">
      <h1 className="fw-bold mb-5 text-center">Course Reviews</h1>

      <Slider
        {...settings}
        className={
          slideCount === 1
            ? "col-lg-5 mx-auto mt-lg-4 pb-5"
            : "col-lg-10 mx-auto mt-lg-4 pb-5"
        }
      >
        {reviews.map((review) => (
          <Col key={review._id}>
            <Card
              style={{
                minHeight: "300px",
                maxHeight: "300px",
              }}
              className="mx-3 text-dark"
            >
              <Card.Body>
                <div className="d-flex align-items-center text-start">
                  <FontAwesomeIcon
                    className="text-secondary"
                    icon={faUserCircle}
                    style={{ width: 48, height: 48 }}
                  />

                  <Card.Title className="ms-3">
                    <small className="m-0">
                      {review?.user?.firstName +
                        " " +
                        (review?.user?.middleName || "") +
                        " " +
                        review?.user?.lastName}
                    </small>
                    <br />
                    <Rating
                      className="me-1"
                      initialRating={review.rating}
                      emptySymbol={
                        <FontAwesomeIcon icon={faStar} color="whitesmoke" />
                      }
                      fullSymbol={
                        <FontAwesomeIcon icon={faStar} color="gold" />
                      }
                      readonly
                    ></Rating>
                  </Card.Title>
                </div>
                <hr />
                <Card.Text>{review.words}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Slider>
    </div>
  );
};

export default UserReviews;
