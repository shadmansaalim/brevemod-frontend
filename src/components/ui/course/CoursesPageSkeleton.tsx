// Imports
import { Container, Row } from "react-bootstrap";
import CourseCardSkeleton from "./CourseCardSkeleton";

const CoursesPageSkeleton = () => {
  return (
    <>
      <div className="col-lg-6 mx-auto mt-5">
        <a
          href="#"
          className="btn btn-secondary disabled placeholder w-100"
          aria-hidden="true"
        ></a>
      </div>
      <Container>
        <section>
          <div>
            <Row xs={1} md={2} lg={4} className="g-4 mt-3 mb-5">
              {[...Array(8).keys()].map((index: number) => (
                <CourseCardSkeleton key={index} />
              ))}
            </Row>
            <div className="d-flex justify-content-end">
              <nav aria-label="...">
                <ul className="pagination">
                  {
                    <li className="page-item disabled">
                      <button
                        className="page-link disabled placeholder"
                        aria-label="Previous"
                      >
                        Previous
                      </button>
                    </li>
                  }
                  {
                    <li className="page-item disabled">
                      <button
                        className="page-link disabled placeholder"
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
    </>
  );
};

export default CoursesPageSkeleton;
