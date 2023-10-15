// Imports
import { Navbar, NavDropdown, Container, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
  faUser,
  faUserTie,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import useAuth from "@/hooks/auth/useAuth";
import ProfileIcon from "../../assets/images/profileIcon.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const { currentUser, logoutUser } = useAuth();
  const router = useRouter();

  return (
    // Website Top Navigation Bar
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
              href="/my-classes"
              style={{ color: "#161c2d" }}
            >
              My Classes
            </Link>
            <Link
              className="text-decoration-none me-lg-3"
              href="/about"
              style={{ color: "#161c2d" }}
            >
              About
            </Link>

            <button className="btn btn-outline-dark mt-2 mt-lg-0 px-2 py-1 position-relative">
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                2<span className="visually-hidden">Course Cart</span>
              </span>
            </button>
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
                <NavDropdown.Item eventKey="4.1">
                  <FontAwesomeIcon className="me-2" icon={faUser} /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.3" href="/instructors">
                  <FontAwesomeIcon className="me-2" icon={faUserTie} />{" "}
                  Instructors
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
