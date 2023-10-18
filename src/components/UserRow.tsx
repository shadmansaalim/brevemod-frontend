// Imports
import { ENUM_USER_ROLES } from "@/enums/user";
import useAuth from "@/hooks/auth/useAuth";
import { IUser, IUserUpdateData } from "@/interfaces/common";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { getTokenFromLocalStorage } from "@/utilities/common";

const UserRow = (props: { user: IUser; index: number }) => {
  const { user, index } = props;
  const { currentUser } = useAuth();

  const [userRole, setUserRole] = useState(user.role);

  const remainingUserRoles = Object.values(ENUM_USER_ROLES).filter(
    (role) => role !== user.role
  );

  const [modalShow, setModalShow] = useState(false);
  const [userUpdateData, setUserUpdateData] = useState<IUserUpdateData | null>(
    null
  );
  const [updating, setUpdating] = useState(false);

  const handleModalClose = () => setModalShow(false);
  const handleModalShow = () => setModalShow(true);

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof IUserUpdateData;
    const value = e.target.value;
    const newUserUpdateData = { ...userUpdateData };
    newUserUpdateData[field] = value;
    setUserUpdateData(newUserUpdateData as IUserUpdateData);
  };

  const handleUpdateUserData = (e: React.FormEvent<HTMLFormElement>) => {
    if (userUpdateData) {
      console.log(userUpdateData);
      setUpdating(true);
      fetch(`http://localhost:8080/api/v1/users/${user._id}`, {
        method: "PATCH",
        headers: {
          Authorization: getTokenFromLocalStorage(),
          "content-type": "application/json",
        },
        body: JSON.stringify(userUpdateData),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            handleModalClose();
            swal(result.message, "", "success");
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setUpdating(true));
    }

    e.preventDefault();
  };

  return (
    <tr>
      <td className="d-none d-md-table-cell">{index + 1}</td>
      <td className="d-none d-md-table-cell">{user.firstName}</td>
      <td className="d-none d-md-table-cell">{user?.middleName || "N/A"}</td>
      <td className="d-none d-md-table-cell">{user?.lastName}</td>
      <td>{user.email}</td>
      {currentUser.email === user.email ? (
        <td title="You cannot change your user role">
          <p>N/A</p>
        </td>
      ) : (
        <td>
          <button onClick={handleModalShow} className="btn btn-outline-dark">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-outline-danger ms-2">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </td>
      )}

      <Modal show={modalShow} onHide={handleModalClose}>
        <form onSubmit={handleUpdateUserData}>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit User Data
              <FontAwesomeIcon className="text-secondary ms-2" icon={faEdit} />
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
                defaultValue={user?.firstName}
              />
            </div>
            <div className="form-outline flex-fill mb-4">
              <input
                onBlur={handleOnBlur}
                name="middleName"
                type="text"
                className="form-control"
                placeholder="Middle Name"
                defaultValue={user?.middleName}
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
                defaultValue={user?.lastName}
              />
            </div>
            <div className="form-outline flex-fill mb-4">
              <input
                title="You cannot change user email."
                disabled
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                required
                defaultValue={user?.email}
              />
            </div>
            <div className="form-outline flex-fill">
              <p className="mb-1">User Role</p>
              <select
                aria-label="Default select example"
                className={
                  userRole === "admin"
                    ? "form-select btn btn-success w-100 text-uppercase"
                    : "form-select btn btn-warning w-100 text-uppercase"
                }
              >
                <option selected>{user.role}</option>
                {remainingUserRoles.map((role) => (
                  <option value={role}>{role}</option>
                ))}
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {updating ? (
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
                Updating...
              </button>
            ) : (
              <button type="submit" className="btn btn-secondary w-100">
                Update
                <FontAwesomeIcon className="ms-2" icon={faEdit} />
              </button>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </tr>
  );
};

export default UserRow;
