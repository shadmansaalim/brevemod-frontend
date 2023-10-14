// Imports
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    // Website Top Navigation Bar
    <Navbar className="shadow-lg pt-lg-3" expand="lg">
      <Container>
        <Navbar.Brand href="/home">
          <img
            src=""
            width="80"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
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
            <div className="d-flex flex-column flex-lg-row mt-2 mt-lg-0">
              <Button className="me-lg-3" variant="outline-primary">
                Sign Up <FontAwesomeIcon icon={faUserPlus} />
              </Button>
              <Button className="mt-1 mt-lg-0" variant="primary">
                Login <FontAwesomeIcon icon={faSignInAlt} />
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
