// Imports
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFolder,
  faUsers,
  faStar,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const sideBarItems = [
  {
    link: "/",
    label: "Home",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    link: "/dashboard",
    label: "Dashboard",
    icon: <FontAwesomeIcon icon={faDatabase} />,
  },
  {
    link: "/dashboard/courses",
    label: "Courses",
    icon: <FontAwesomeIcon icon={faFolder} />,
  },
  {
    link: "/dashboard/users",
    label: "Users",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },
  {
    link: "/dashboard/reviews",
    label: "Reviews",
    icon: <FontAwesomeIcon icon={faStar} />,
  },
];

const Sidebar = () => {
  return (
    <div
      id="sidebar-wrapper"
      style={{
        backgroundColor: "black",
      }}
    >
      <div className="text-center pt-4 pb-2 border-bottom">
        <img
          src="/ProfileIcon.png"
          className="img-fluid mb-3"
          width={80}
          height={80}
          id="profile-dropdown"
          alt="Profile Icon"
        />
      </div>

      <div className="list-group list-group-flush my-3 mx-auto">
        <div>
          {sideBarItems.map((item) => (
            <Link href={item.link} className="text-decoration-none">
              <Button className="btn btn-secondary col-10 mb-3 d-flex justify-content-between align-items-center mx-auto">
                <span className="col-3 text-end">{item.icon}</span>
                <span className="col-8 text-start">{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
