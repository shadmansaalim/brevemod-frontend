//Imports
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPen,
  faTachometerAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "../ui/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [toggled, setToggled] = useState(true);
  const router = useRouter();

  return (
    <>
      <div className={toggled ? "d-flex toggled" : "d-flex"} id="wrapper">
        <Sidebar />
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
    </>
  );
};

export default DashboardLayout;
