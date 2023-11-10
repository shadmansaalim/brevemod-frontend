// Imports
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import AuthLayout from "@/components/Layouts/AuthLayout";
import type { ReactElement } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faUsers, faStar } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const DashboardHomePage = () => {
  return (
    <section>
      <div>
        <div className="row g-3 my-2 text-white">
          <div className="col-lg-6 col-xl-3">
            <div
              className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded"
              style={{ backgroundColor: "#3984ff" }}
            >
              <div className="col-8">
                <h3 className="fw-bold fs-2 m-0">24</h3>
                <p className="m-0">Courses</p>
              </div>
              <span className="col-4 text-start">
                <FontAwesomeIcon
                  icon={faFolder}
                  className="primary-text border rounded-full secondary-bg p-3 m-0"
                />
              </span>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3">
            <div
              className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded"
              style={{ backgroundColor: "#fa5649" }}
            >
              <div className="col-8">
                <h3 className="fw-bold fs-2 m-0">13</h3>
                <p className="m-0">Users</p>
              </div>
              <span className="col-4 text-start">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="primary-text border rounded-full secondary-bg p-3 m-0"
                />
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-xl-3">
            <div
              className="p-4  shadow-sm d-flex justify-content-around align-items-center rounded"
              style={{ backgroundColor: "#ffa113" }}
            >
              <div className="col-8">
                <h3 className="fw-bold fs-2 m-0">23</h3>
                <p className="m-0">Course Reviews</p>
              </div>
              <span className="col-4 text-start">
                <FontAwesomeIcon
                  icon={faStar}
                  className="primary-text border rounded-full secondary-bg p-3 m-0"
                />
              </span>
            </div>
          </div>

          <div className="col-lg-6 col-xl-3">
            <div
              className="p-4  shadow-sm d-flex justify-content-around align-items-center rounded"
              style={{ backgroundColor: "#5a00dd" }}
            >
              <div className="col-8">
                <h3 className="fw-bold fs-2 m-0">33</h3>
                <p className="m-0">Reviews</p>
              </div>
              <span className="col-4 text-start">
                <FontAwesomeIcon
                  icon={faStar}
                  className="primary-text border rounded-full secondary-bg p-3 m-0"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="bg-dark p-3 text-end"></div>
          {/* <Table bordered hover>
            <thead>
              <tr>
                <th className="d-none d-md-table-cell">#</th>
                <th className="d-none d-md-table-cell">First Name</th>
                <th className="d-none d-md-table-cell">Middle Name</th>
                <th className="d-none d-md-table-cell">Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <UserRow
                  key={index}
                  index={index}
                  user={user}
                  users={users}
                  setUsers={setUsers}
                />
              ))}
            </tbody>
          </Table> */}
        </div>
      </div>
    </section>
  );
};

export default DashboardHomePage;

DashboardHomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout onlyAdminAccess={true}>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthLayout>
  );
};
