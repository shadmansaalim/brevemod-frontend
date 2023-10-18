// Imports
import AdminDashboardLayout from "@/components/Layouts/AdminDashboardLayout";
import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faUser,
  faPen,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import UserRow from "@/components/UserRow";
import { getTokenFromLocalStorage } from "@/utilities/common";
import swal from "sweetalert";
import { IUser } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";

const AdminDashboardHomePage = () => {
  const { isLoading, setIsLoading } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [dashboardData, setDashboardData] = useState<{
    coursesCount: number;
    usersCount: number;
    courseReviewsCount: number;
    feedbacksCount: number;
  } | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/v1/admin-dashboard`, {
      method: "GET",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setDashboardData(data?.data))
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/v1/users`, {
      method: "GET",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data?.data))
      .catch((error) => console.log(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <div className="row g-3 my-2 text-white">
            <div className="col-lg-6 col-xl-3">
              <div
                className="p-4 shadow-sm d-flex justify-content-around align-items-center rounded"
                style={{ backgroundColor: "#3984ff" }}
              >
                <div className="col-8">
                  <h3 className="fw-bold fs-2 m-0">
                    {dashboardData?.coursesCount}
                  </h3>
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
                  <h3 className="fw-bold fs-2 m-0">
                    {dashboardData?.usersCount}
                  </h3>
                  <p className="m-0">Users</p>
                </div>
                <span className="col-4 text-start">
                  <FontAwesomeIcon
                    icon={faUser}
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
                  <h3 className="fw-bold fs-2 m-0">
                    {dashboardData?.courseReviewsCount}
                  </h3>
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
                  <h3 className="fw-bold fs-2 m-0">
                    {dashboardData?.feedbacksCount}
                  </h3>
                  <p className="m-0">Feedbacks</p>
                </div>
                <span className="col-4 text-start">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="primary-text border rounded-full secondary-bg p-3 m-0"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Table bordered hover>
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
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardHomePage;

AdminDashboardHomePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminDashboardLayout>{page}</AdminDashboardLayout>;
};
