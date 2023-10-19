// Imports
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import type { ReactElement } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth/useAuth";
import MyCourse from "@/components/MyCourse";
import { ICourse } from "@/interfaces/common";
import EmptyCartImage from "../../assets/images/EmptyCart.svg";
import Image from "next/image";

const DashboardHomePage = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  return (
    <section className="text-center">
      <Container>
        {currentUser?.purchases.length ? (
          <section style={{ marginBottom: "150px" }}>
            <div className="my-4">
              <h3 className="fw-light mb-5">
                Welcome back
                <span className="fw-normal ms-1">{currentUser?.firstName}</span>
                , ready for your next lesson?
              </h3>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {currentUser?.purchases.map((course: ICourse) => (
                  <MyCourse key={course._id} course={course} />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <>
            {currentUser?.purchases?.length === 0 ? (
              <Row style={{ marginTop: "80px", marginBottom: "80px" }}>
                <Col lg="6" className="mx-auto shadow-lg mb-5 p-5 rounded-3">
                  <Image
                    src={EmptyCartImage}
                    className="img-fluid mb-3 col-6"
                    alt="Empty Cart Image"
                  />

                  <h3>No Courses Added</h3>
                  <p>
                    You have not added any course to your class. Please go back
                    to home or courses and add a course to continue learning.
                  </p>
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline-primary me-3"
                  >
                    Home <FontAwesomeIcon icon={faHome} />
                  </Button>
                  <Button
                    onClick={() => router.push("/courses")}
                    variant="outline-primary"
                  >
                    Courses <FontAwesomeIcon icon={faAngleDoubleRight} />
                  </Button>
                </Col>
              </Row>
            ) : (
              <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="spinner"></div>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default DashboardHomePage;

DashboardHomePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
