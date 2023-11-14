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
import styles from "../styles/profilePage.module.css";
import { isObjectFieldValuesEqual } from "@/utils/common";

type IUserProfileData = {
  firstName: string;
  middleName: string;
  lastName: string;
};

const ProfilePage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [updateUserProfile] = useUpdateUserProfileMutation();

  // States
  const [editable, setEditable] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [profileData, setProfileData] = useState<IUserProfileData>({
    firstName: currentUser?.firstName || "",
    middleName: currentUser?.middleName || "",
    lastName: currentUser?.lastName || "",
  });

  const [isChanged, setIsChanged] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name as keyof IUserProfileData;
    const value = e.target.value;

    const newProfileData = { ...profileData };
    newProfileData[field] = value;
    setProfileData(newProfileData);

    if (isObjectFieldValuesEqual(newProfileData, profileData)) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
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
        setEditable(false);
      }

      setUpdating(false);
    } catch (err: any) {
      swal(err?.data?.message || err?.message, "", "error");
      setUpdating(false);
    }
  };

  return (
    <div className="my-5">
      <Container className="d-flex justify-content-center">
        <div className={`mx-auto col-12 col-lg-9 ${styles.profileWrapper}`}>
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
                    className={`rounded-3 w-100 ${styles.profileInput}`}
                    defaultValue={currentUser?.firstName}
                  />
                </div>
              ) : (
                <span
                  className={`p-2 rounded-3 w-100 d-flex align-items-center ${styles.profileData}`}
                >
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
                    className={`rounded-3 w-100 ${styles.profileInput}`}
                    defaultValue={currentUser?.middleName}
                  />
                </div>
              ) : (
                <span
                  className={`p-2 rounded-3 w-100 d-flex align-items-center ${styles.profileData}`}
                >
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
                    className={`rounded-3 w-100 ${styles.profileInput}`}
                    defaultValue={currentUser?.lastName}
                  />
                </div>
              ) : (
                <span
                  className={`p-2 rounded-3 w-100 d-flex align-items-center ${styles.profileData}`}
                >
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
                      disabled={isChanged ? false : true}
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
