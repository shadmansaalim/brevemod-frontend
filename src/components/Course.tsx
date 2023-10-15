// Imports
import { Card, Col, Button } from "react-bootstrap";
import Rating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourse } from "@/interfaces/common";

const Course = (props: { course: ICourse }) => {
  const { course } = props;
  const router = useRouter();

  const goToCourseDetails = () => {
    router.push(`/course/${course._id}`);
  };

  return (
    <Col>
      <Card className="h-100">
        <Card.Img variant="top" src={course.thumbnailLink} />
        <Card.Body className="d-flex flex-column justify-content-around">
          <Card.Title>{course.title}</Card.Title>
          <Card.Text>
            <small>{course.instructorName}</small>
            <span className="d-flex justify-content-center mt-1">
              <span className="me-1 rating">{course.avgRating}</span>
              <small>(34345345)</small>
            </span>
            <span className="d-flex justify-content-center mt-2">
              <span className="fw-bold fs-5">${course.price}</span>
            </span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button onClick={goToCourseDetails} variant="primary">
            Preview Course <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Course;
