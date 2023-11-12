// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Container } from "react-bootstrap";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCourseQuery } from "@/redux/api/courseApi";
import { useRouter } from "next/router";
import { ICourse, ICourseModule, ResponseSuccessType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useAddToCartMutation } from "@/redux/api/cartApi";
import swal from "sweetalert";
import { useIsCoursePurchasedQuery } from "@/redux/api/purchaseApi";
import { setCart } from "@/redux/slices/cartSlice";
import { isLoggedIn } from "@/services/auth.service";
import { ENUM_USER_ROLES } from "@/enums/user";
import { faForward } from "@fortawesome/free-solid-svg-icons";

const CourseDetailsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { courseId } = router?.query;

  const { currentUser } = useAppSelector((state) => state.user);

  const [addToCart] = useAddToCartMutation();

  const { data: courseData, isLoading: courseDataLoading } =
    useCourseQuery(courseId);
  const course = courseData?.data as ICourse;

  const { data: purchaseData, isLoading: purchaseDataLoading } =
    currentUser && currentUser.role === ENUM_USER_ROLES.STUDENT
      ? useIsCoursePurchasedQuery(courseId)
      : { data: null, isLoading: false };

  const { cart } = useAppSelector((state) => state.cart);

  const handleAddToCart = async () => {
    try {
      if (isLoggedIn()) {
        const res: ResponseSuccessType = await addToCart(courseId).unwrap();

        if (res?.success) {
          dispatch(setCart(res?.data));
        }
      } else {
        swal(
          "Unauthorized User",
          "Please login to add courses in cart.",
          "warning"
        );
        router.push("/login");
      }
    } catch (err) {
      swal(err.message, "", "error");
    }
  };

  const handleMoveToCourseModulesPage = () => {
    router.push(`/course-content/admin/${courseId}`);
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      {!courseDataLoading && !purchaseDataLoading ? (
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
                      title={course?.title}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                      }}
                      src={`https://www.youtube.com/embed/${course?.introVideoLink}`}
                      frameBorder="0"
                    />
                  </div>
                </div>
                <div className="col-lg-5 col-xl-6 mx-auto text-start mt-3 mt-lg-0">
                  <h3>{course?.title}</h3>
                  <p className="mb-2">tagline</p>
                  <small>
                    <b>4.5</b>(53,134)
                  </small>
                  <br />
                  <small>
                    Created by <a href="!#">{course?.instructorName}</a>
                  </small>
                  <br />
                  {currentUser && currentUser.role === ENUM_USER_ROLES.ADMIN ? (
                    <button
                      onClick={handleMoveToCourseModulesPage}
                      className="btn btn-success text-white mt-3"
                    >
                      Course Modules <FontAwesomeIcon icon={faForward} />
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className={
                        !cart?.courses.includes(courseId as string) &&
                        !purchaseData?.data
                          ? "btn btn-secondary text-white mt-3"
                          : "btn btn-success text-white mt-3 disabled"
                      }
                    >
                      {purchaseData?.data ? (
                        <p className="m-0">
                          Purchased <FontAwesomeIcon icon={faCheck} />
                        </p>
                      ) : cart?.courses.includes(courseId as string) ? (
                        <p className="m-0">
                          Added to Cart{" "}
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </p>
                      ) : (
                        <p className="m-0">
                          Add to Cart <FontAwesomeIcon icon={faShoppingCart} />
                        </p>
                      )}
                    </button>
                  )}
                </div>
              </section>
            </Container>
          </div>
          <div className="p-3 px-lg-0 py-lg-5">
            <section className="col-lg-9 mb-5 mt-lg-4 mx-auto">
              <h3 className="text-start mb-3 fw-light">Description</h3>
              <p className="text-start">{course?.description}</p>
              <div className="mt-4 mt-md-5 mb-4 row d-flex align-items-center justify-content-center col-xl-8 mx-auto text-white">
                <div className="shadow-lg p-5 rounded-3 bg-success col-7 col-md-3 mx-auto mb-3 mb-md-0">
                  <h5>
                    <CountUp
                      redraw={true}
                      end={course?.lecturesCount}
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
                      end={course?.studentsCount}
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
                      end={course?.projectsCount}
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
          <div>
            {/* {courseReviews?.length && (
              <div
                className=""
                style={{
                  backgroundColor: "#f5f7ff",
                }}
              >
                <UserReviews reviews={courseReviews} />
              </div>
            )} */}
          </div>
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

// export const getServerSideProps = async (context: any) => {
//   const { params } = context;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${params.id}`
//   );
//   const data = await res.json();
//   const course = data?.data;
//   return { props: { course } };
// };
