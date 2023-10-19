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
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import UserRow from "@/components/UserRow";
import { getTokenFromLocalStorage } from "@/utilities/common";
import swal from "sweetalert";
import { IUser } from "@/interfaces/common";
import useAuth from "@/hooks/auth/useAuth";
import { Modal } from "react-bootstrap";
import { ISignUpUser } from "@/hooks/auth/IAuth";

const AdminDashboardHomePage = () => {
  const { currentUser, isLoading, setIsLoading } = useAuth();
  const [users, setUsers] = useState<IUser[]>([]);
  const [dashboardData, setDashboardData] = useState<{
    coursesCount: number;
    usersCount: number;
    courseReviewsCount: number;
    feedbacksCount: number;
  } | null>(null);

  const [userData, setUserData] = useState<ISignUpUser | null>(null);

  const [modalShow, setModalShow] = useState(false);
  const [creatingUser, setCreatingUser] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleOnBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const field = e.target.name as keyof ISignUpUser;
    const value = e.target.value;
    const newUserData = { ...userData };
    newUserData[field] = value;
    setUserData(newUserData as ISignUpUser);
  };

  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData) {
      setCreatingUser(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/`, {
        method: "POST",
        headers: {
          Authorization: getTokenFromLocalStorage(),
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            setUsers([...users, result.data]);
            handleModalClose();
            swal(result.message, "", "success");
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setCreatingUser(false));
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin-dashboard`, {
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
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.data);
      })
      .catch((error) => console.log(error.message));
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
            <div className="bg-dark p-3 text-end">
              <button onClick={handleModalShow} className="btn btn-success">
                Create New User
                <FontAwesomeIcon icon={faUser} className="ms-1" />
              </button>

              <Modal show={modalShow} onHide={handleModalClose}>
                <form onSubmit={handleCreateUser}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Create New User
                      <FontAwesomeIcon
                        className="text-secondary ms-2"
                        icon={faUser}
                      />
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="form-outline flex-fill mb-4">
                      <input
                        onBlur={handleOnBlur}
                        name="firstName"
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div className="form-outline flex-fill mb-4">
                      <input
                        onBlur={handleOnBlur}
                        name="middleName"
                        type="text"
                        className="form-control"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="form-outline flex-fill mb-4">
                      <input
                        onBlur={handleOnBlur}
                        name="lastName"
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                    <div className="form-outline flex-fill mb-4">
                      <input
                        onBlur={handleOnBlur}
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-outline flex-fill">
                      <p className="mb-1">User Role</p>
                      <select
                        required
                        onChange={handleOnBlur}
                        name="role"
                        aria-label="Default select example"
                        className={
                          userData?.role === "admin" ||
                          userData?.role === "super_admin"
                            ? "form-select btn btn-success w-100 text-uppercase"
                            : "form-select btn btn-warning w-100 text-uppercase"
                        }
                      >
                        <option value="">Select</option>
                        <option value="student">student</option>
                        <option value="admin">admin</option>
                        <option value="super_admin">super_admin</option>
                      </select>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {creatingUser ? (
                      <button
                        className="btn btn-secondary w-100"
                        type="button"
                        disabled
                      >
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Creating...
                      </button>
                    ) : (
                      <button type="submit" className="btn btn-secondary w-100">
                        Create User
                        <FontAwesomeIcon className="ms-2" icon={faForward} />
                      </button>
                    )}
                  </Modal.Footer>
                </form>
              </Modal>
            </div>
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
