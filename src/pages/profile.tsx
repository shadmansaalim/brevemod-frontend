// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import swal from "sweetalert";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import AuthLayout from "@/components/Layouts/AuthLayout";
import { useUpdateUserProfileMutation } from "@/redux/api/profileApi";
import { ResponseSuccessType } from "@/types";
import { setCurrentUser } from "@/redux/slices/userSlice";

type IUserProfileData = {
  firstName: string;
  middleName: string;
  lastName: string;
};

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [editable, setEditable] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState<IUserProfileData>({
    firstName: currentUser?.firstName || "",
    middleName: currentUser?.middleName || "",
    lastName: currentUser?.lastName || "",
  });
  const [errors, setErrors] = useState<IUserProfileData>({
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newErrors = { ...errors };
    const field = e.target.name as keyof IUserProfileData;
    const value = e.target.value;

    if (value.length < 4 && field !== "middleName") {
      newErrors[field] = "Name should contain at least 4 characters";
    } else {
      const newProfileData = { ...profileData };
      newProfileData[field] = value;
      setProfileData(newProfileData);
      newErrors[field] = "";
    }
    setErrors(newErrors);
  };

  const handleUpdateUserProfile = async () => {
    setUpdating(true);
    try {
      const res: ResponseSuccessType = await updateUserProfile({
        ...profileData,
      }).unwrap();

      if (res?.success) {
        dispatch(setCurrentUser(res?.data));
        setProfileData({
          firstName: res?.data?.firstName || "",
          middleName: res?.data?.middleName || "",
          lastName: res?.data?.lastName || "",
        });
        swal(res?.message, "", "success");
      }

      setUpdating(false);
    } catch (err) {
      swal(err?.data?.message || err?.message, "", "error");
      setUpdating(false);
    }
  };

  return (
    <div className="my-5">
      <Container className="d-flex justify-content-center">
        <div className="mx-auto col-12 col-lg-9 profile-wrapper">
          <div className="text-center">
            <Image
              src="/ProfileIcon.png"
              className="img-fluid"
              width={80}
              height={80}
              id="profile-dropdown"
              alt="Profile Icon"
            />
          </div>
          <div className="mt-2 text-center">
            <span>Email : </span>
            <span>{currentUser?.email}</span>
            <hr />
          </div>
          <div className="mt-3 text-start">
            <div className="mb-4">
              <div className="mb-2">First Name</div>
              {editable ? (
                <div>
                  <input
                    name="firstName"
                    onChange={handleOnChange}
                    type="text"
                    className="rounded-3 w-100"
                    defaultValue={currentUser?.firstName}
                  />
                  {errors.firstName.length > 0 && (
                    <div className="mt-1">
                      <small className="text-danger">{errors.firstName}</small>
                    </div>
                  )}
                </div>
              ) : (
                <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">
                  {currentUser?.firstName}
                </span>
              )}
            </div>
            <div className="mb-4">
              <div className="mb-2">Middle Name</div>
              {editable ? (
                <div>
                  <input
                    name="middleName"
                    onChange={handleOnChange}
                    type="text"
                    className="rounded-3 w-100"
                    defaultValue={currentUser?.middleName}
                  />
                  {errors.middleName.length > 0 && (
                    <div className="mt-1">
                      <small className="text-danger">{errors.middleName}</small>
                    </div>
                  )}
                </div>
              ) : (
                <span className="p-2 rounded-3 w-100 user-details d-flex align-items-center">
                  {currentUser?.middleName}
                </span>
              )}
            </div>
            <div className="mb-4">
              <div className="mb-2">LastName</div>
              {editable ? (
                <div>
                  <input
                    name="lastName"
                    onChange={handleOnChange}
                    type="text"
                    className="w-100 rounded-3"
                    defaultValue={currentUser?.lastName}
                  />
                  {errors.lastName.length > 0 && (
                    <div className="mt-1">
                      <small className="text-danger">{errors.lastName}</small>
                    </div>
                  )}
                </div>
              ) : (
                <span className="rounded-3 w-100 user-details d-flex align-items-center">
                  {currentUser?.lastName}
                </span>
              )}
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-center col-12 col-md-7 mx-auto">
              {editable ? (
                <>
                  {updating ? (
                    <button className="btn btn-success me-md-3 w-100 disabled">
                      <span className="m-0">Loading</span>
                      <Spinner
                        className="m-0 ms-2"
                        animation="border"
                        size="sm"
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleUpdateUserProfile}
                      disabled={
                        errors.firstName.length > 0 ||
                        errors.middleName.length > 0 ||
                        errors.lastName.length > 0
                          ? true
                          : false
                      }
                      className="btn btn-success me-md-3 w-100"
                    >
                      Save Changes <FontAwesomeIcon icon={faEdit} />
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="btn btn-secondary me-md-3 w-100"
                  onClick={() => setEditable(true)}
                >
                  Edit Account <FontAwesomeIcon icon={faEdit} />
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      <RootLayout>{page}</RootLayout>
    </AuthLayout>
  );
};
