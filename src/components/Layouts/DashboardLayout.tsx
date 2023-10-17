// Imports
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSignOutAlt,
  faImage,
  faPen,
  faTachometerAlt,
  faBox,
  faBlog,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import ProfileIcon from "../../assets/images/ProfileIcon.png";
import { useRouter } from "next/router";
import useAuth from "@/hooks/auth/useAuth";
import Image from "next/image";
import Link from "next/link";
import ContextProvider from "@/context/ContextProvider";

const DashboardLayout = ({ children }: any) => {
  const [toggled, setToggled] = useState(true);
  const router = useRouter();
  const { currentUser, logoutUser, isLoading } = useAuth();
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const handleOffCanvasClose = () => setOffCanvasShow(false);
  const handleOffCanvasShow = () => setOffCanvasShow(true);

  console.log(router);

  return (
    <ContextProvider>
      <div>
        {isLoading ? (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className={toggled ? "d-flex toggled" : "d-flex"} id="wrapper">
            <div
              id="sidebar-wrapper"
              style={{
                backgroundColor: "black",
              }}
            >
              <div className="text-center pt-4 pb-2 border-bottom">
                <Image
                  src={ProfileIcon}
                  className="img-fluid mb-3"
                  width={80}
                  height={80}
                  id="profile-dropdown"
                  alt="Profile Icon"
                />
              </div>

              <div className="list-group list-group-flush my-3 mx-auto">
                <div>
                  <Link href="/" className="text-decoration-none">
                    <Button className="btn btn-primary col-10 mb-3 d-flex justify-content-between align-items-center mx-auto">
                      <span className="col-3 text-end">
                        <FontAwesomeIcon icon={faHome} />
                      </span>
                      <span className="col-8 text-start">Home</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="text-decoration-none">
                    <Button className="btn btn-primary col-10 mb-3 d-flex justify-content-between align-items-center mx-auto">
                      <span className="col-3 text-end">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                      </span>
                      <span className="col-8 text-start">Dashboard</span>
                    </Button>
                  </Link>
                  <Link
                    href="/dashboard/feedback"
                    className="text-decoration-none"
                  >
                    <Button className="btn btn-primary col-10 mb-3 d-flex justify-content-between align-items-center mx-auto">
                      <span className="col-3 text-end">
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                      <span className="col-8 text-start">Feedback</span>
                    </Button>
                  </Link>

                  <button
                    onClick={() => {
                      logoutUser();
                      handleOffCanvasClose();
                      router.push("/");
                    }}
                    className="btn btn-outline-warning col-10 d-flex justify-content-between align-items-center mx-auto"
                  >
                    <span className="col-3 text-end">
                      <FontAwesomeIcon icon={faSignOutAlt} />
                    </span>
                    <span className="col-8 text-start">Log Out</span>
                  </button>
                </div>
              </div>
            </div>

            <div id="page-content-wrapper">
              <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => setToggled(!toggled)}
                    className="primary-text fs-4 me-3"
                    id="menu-toggle"
                    style={{ color: "#0d6efd" }}
                  />
                  <i className="m-0">{router.asPath}</i>
                </div>
              </nav>
              <div className="container-fluid">{children}</div>
            </div>
          </div>
        )}
      </div>
    </ContextProvider>
  );
};

export default DashboardLayout;
