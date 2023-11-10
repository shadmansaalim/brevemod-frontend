// Imports
import { Card, Col, Button } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourse } from "@/types";

const DashboardCourseCard = (props: { course: ICourse }) => {
  const { course } = props;
  const router = useRouter();

  const goToCourseDetails = () => {
    router.push(`/courses/${course._id}`);
  };

  return (
    <Col>
      <Card className="h-100">
        <Card.Img variant="top" src={course.thumbnailLink} />
        <Card.Body className="d-flex flex-column justify-content-around">
          <Card.Title>{course.title}</Card.Title>
          <Card.Text className="text-center">
            <small>{course.instructorName}</small>
            <div className="d-flex justify-content-center mt-1">
              <span className="me-1 rating">{course.avgRating}</span>
              <Rating
                className="me-1"
                initialRating={course.avgRating}
                emptySymbol={
                  <FontAwesomeIcon icon={faStar} color="whitesmoke" />
                }
                fullSymbol={<FontAwesomeIcon icon={faStar} color="gold" />}
                readonly
              ></Rating>
              <small>(34345345)</small>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <span className="fw-bold fs-5">${course.price}</span>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-center">
          <Button onClick={goToCourseDetails} variant="primary">
            Preview Course
            <FontAwesomeIcon icon={faAngleDoubleRight} className="ms-2" />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default DashboardCourseCard;
