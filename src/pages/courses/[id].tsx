// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ICourse } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import { getTokenFromLocalStorage } from "@/utilities/common";
import { useEffect } from "react";

const CourseDetailsPage: NextPageWithLayout<{
  course: ICourse;
}> = ({ course }) => {
  const { currentUser, setCurrentUser, isLoading, setIsLoading } = useAuth();

  const isAddedToCart = currentUser?.cart.courses.find(
    (cartCourse: ICourse) => cartCourse._id === course._id
  );

  const isPurchased = currentUser?.purchases.find(
    (purchaseCourse: ICourse) => purchaseCourse._id === course._id
  );

  const [addedToCart, setAddedToCart] = useState(false);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    if (isAddedToCart) {
      setAddedToCart(true);
    }
    if (isPurchased) {
      setPurchased(true);
    }
  }, [currentUser]);

  const handleAddToCart = async () => {
    fetch(`http://localhost:8080/api/v1/cart/add-to-cart/${course._id}`, {
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
        setAddedToCart(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {!isLoading ? (
        <section>
          <div
            className="py-4 py-lg-5"
            style={{
              backgroundColor: "#f5f7ff",
            }}
          >
            <Container>
              <section className="row mb-5 d-flex mt-lg-4">
                <div className="col-lg-6 col-xl-5 mx-auto">
                  <div
                    className="video"
                    style={{
                      position: "relative",
                      paddingBottom: "56.25%",
                      paddingTop: 25,
                      height: 0,
                    }}
                  >
                    <iframe
                      title={course.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      src={`https://www.youtube.com/embed/${course.introVideoLink}`}
                      frameBorder="0"
                    />
                  </div>
                </div>
                <div className="col-lg-5 col-xl-6 mx-auto text-start mt-3 mt-lg-0">
                  <h3>{course.title}</h3>
                  <p className="mb-2">tagline</p>
                  <small>
                    <b>4.5</b>(53,134)
                  </small>
                  <br />
                  <small>
                    Created by <a href="!#">{course.instructorName}</a>
                  </small>
                  <br />
                  <button
                    onClick={handleAddToCart}
                    className={
                      addedToCart === false && purchased === false
                        ? "btn btn-secondary text-white mt-3"
                        : "btn btn-success text-white mt-3 disabled"
                    }
                  >
                    {purchased ? (
                      <p className="m-0">
                        Purchased <FontAwesomeIcon icon={faCheck} />
                      </p>
                    ) : addedToCart === true ? (
                      <p className="m-0">
                        Added to Cart <FontAwesomeIcon icon={faShoppingCart} />
                      </p>
                    ) : (
                      <p className="m-0">
                        Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
                      </p>
                    )}
                  </button>
                </div>
              </section>
            </Container>
          </div>
          <div className="p-3 px-lg-0 py-lg-5">
            <section className="col-lg-9 mb-5 mt-lg-4 mx-auto">
              <h3 className="text-start mb-3 fw-light">Description</h3>
              <p className="text-start">{course.description}</p>
              <div className="mt-4 mt-md-5 mb-4 row d-flex align-items-center justify-content-center col-xl-8 mx-auto text-white">
                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                  <h5>
                    <CountUp
                      redraw={true}
                      end={course.lecturesCount}
                      duration={2}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h5>
                  <small>Lectures</small>
                </div>
                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                  <h5>
                    <CountUp
                      redraw={true}
                      end={course.studentsCount}
                      duration={2}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h5>
                  <small>Students</small>
                </div>
                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto">
                  <h5>
                    <CountUp
                      redraw={true}
                      end={course.projectsCount}
                      duration={2}
                    >
                      {({ countUpRef, start }) => (
                        <VisibilitySensor onChange={start} delayedCall>
                          <span ref={countUpRef} />
                        </VisibilitySensor>
                      )}
                    </CountUp>
                  </h5>
                  <small>Projects</small>
                </div>
              </div>
            </section>
          </div>
          <></>
        </section>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsPage;

CourseDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export const getServerSideProps = async (context: any) => {
  const { params } = context;
  const res = await fetch(`http://localhost:8080/api/v1/courses/${params.id}`);
  const data = await res.json();
  const course = data?.data;
  return { props: { course } };
};
