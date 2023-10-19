// Imports
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Button,
  Modal,
} from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
  faUser,
  faDashboard,
  faRightFromBracket,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/auth/useAuth";
import ProfileIcon from "@/assets/images/ProfileIcon.png";
import { useRouter } from "next/router";
import { useState } from "react";
import Cart from "../Cart";
import Image from "next/image";

const Header = () => {
  const { currentUser, logoutUser } = useAuth();
  const router = useRouter();

  const [modalShow, setModalShow] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  return (
    <Navbar className="shadow-sm pt-lg-3" expand="lg">
      <Container>
        <Navbar.Brand className="fw-bold" href="/">
          BREVEMOD.
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex align-items-center">
            <Link
              className="text-decoration-none ms-lg-2 me-lg-3"
              href="/"
              style={{ color: "#161c2d" }}
            >
              Home
            </Link>
            <Link
              className="text-decoration-none me-lg-3"
              href="/courses"
              style={{ color: "#161c2d" }}
            >
              Courses
            </Link>
            <Link
              className="text-decoration-none me-lg-3"
              href="/about"
              style={{ color: "#161c2d" }}
            >
              About
            </Link>

            <button
              onClick={handleModalShow}
              className="btn btn-outline-dark mt-2 mt-lg-0 px-2 py-1 position-relative"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {currentUser?.cart.courses.length || 0}
                <span className="visually-hidden">Course Cart</span>
              </span>
            </button>

            <Modal show={modalShow} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Courses Added</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {currentUser?.cart.courses.length > 0 ? (
                  <Cart cart={currentUser?.cart} />
                ) : (
                  <div className="container-fluid my-5">
                    <div className="offset-lg-3 col-12 text-center mx-auto">
                      <img
                        src="https://codescandy.com/coach/rtl/assets/images/bag.svg"
                        alt=""
                        className="img-fluid mb-4"
                      />
                      <h3 className="fw-bold">Your shopping cart is empty</h3>
                      <p className="mb-4">
                        Add some courses for your delivery slot. Before
                        proceeding to checkout you must add some courses to your
                        shopping cart. You will find a lot of amazing courses on
                        our courses page with limited offers.
                      </p>
                    </div>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                {currentUser?.cart.courses.length > 0 ? (
                  <div>
                    <Button variant="secondary" onClick={handleModalClose}>
                      Close
                    </Button>
                    <Button
                      onClick={() => router.push("/cart-review")}
                      className="ms-2"
                      variant="primary"
                    >
                      Review Cart <FontAwesomeIcon icon={faForward} />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleModalClose();
                      router.push("/courses");
                    }}
                  >
                    Browse Courses
                  </Button>
                )}
              </Modal.Footer>
            </Modal>
          </Nav>
          <Nav className="ms-auto">
            {currentUser ? (
              <NavDropdown
                title={
                  <Image
                    src={ProfileIcon}
                    className="img-fluid"
                    width={40}
                    height={40}
                    id="profile-dropdown"
                    alt="Profile Icon"
                  />
                }
              >
                <NavDropdown.Item eventKey="4.0" disabled>
                  {currentUser.firstName}
                </NavDropdown.Item>
                <NavDropdown.Item href="/profile" eventKey="4.1">
                  <FontAwesomeIcon className="me-2" icon={faUser} /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    currentUser.role === "student"
                      ? "/dashboard"
                      : "/admin/dashboard"
                  }
                  eventKey="4.3"
                >
                  <FontAwesomeIcon className="me-2" icon={faDashboard} />{" "}
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutUser} eventKey="4.2">
                  <FontAwesomeIcon className="me-2" icon={faRightFromBracket} />{" "}
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
                <Button
                  onClick={() => router.push("/sign-up")}
                  className="me-lg-3"
                  variant="outline-primary"
                >
                  Sign Up <FontAwesomeIcon icon={faUserPlus} />
                </Button>
                <Button
                  onClick={() => router.push("/login")}
                  className="mt-1 mt-lg-0"
                  variant="primary"
                >
                  Login <FontAwesomeIcon icon={faSignInAlt} />
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
