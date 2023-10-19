// Imports
import AdminDashboardLayout from "@/components/Layouts/AdminDashboardLayout";
import { IFeedback } from "@/interfaces/common";
import { getTokenFromLocalStorage } from "@/utilities/common";
import type { ReactElement } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const AdminDashboardFeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_SERVER_URL}/feedbacks`, {
      method: "GET",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data?.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      {feedbacks.length && (
        <Container className="mt-4">
          <section className="my-5">
            <Row xs={1} lg={2} className="g-4">
              {feedbacks.map((feedback) => (
                <Col key={feedback._id}>
                  <Card
                    style={{
                      minHeight: "300px",
                      maxHeight: "300px",
                    }}
                    className="text-dark"
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
                            {feedback?.user?.firstName +
                              " " +
                              (feedback?.user?.middleName || "") +
                              " " +
                              feedback?.user?.lastName}
                          </small>
                          <br />
                        </Card.Title>
                      </div>
                      <hr />
                      <Card.Text>{feedback.feedback}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
        </Container>
      )}
    </div>
  );
};

export default AdminDashboardFeedbackPage;

AdminDashboardFeedbackPage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
