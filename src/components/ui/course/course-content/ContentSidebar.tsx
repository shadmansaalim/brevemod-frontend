// Imports
import { Col, ProgressBar, Accordion } from "react-bootstrap";
import { useState } from "react";
import { ICourseModule, IUserCourseProgress } from "@/types";
import { ENUM_USER_ROLES } from "@/enums/user";
import CourseModuleItem from "./CourseModuleItem";
import AddModuleModal from "./AddModuleModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";

// Props Type
type IContentSidebarProps = {
  courseProgress: IUserCourseProgress;
  modules: ICourseModule[];
  userRole: ENUM_USER_ROLES;
  courseId: string;
  defaultActiveKey: string;
};

const ContentSidebar = ({
  courseProgress,
  modules,
  userRole,
  courseId,
  defaultActiveKey,
}: IContentSidebarProps) => {
  // States
  const [addModuleModalShow, setAddModuleModalShow] = useState<boolean>(false);
  const progressPercentage = courseProgress?.percentage || 0;

  return (
    <Col className="col-12 col-lg-4">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <h5 className="mb-0 fw-bold">Course Progress</h5>
        <ProgressBar
          className="w-50 mb-0"
          variant="success"
          now={progressPercentage}
          label={`${progressPercentage}%`}
        />
      </div>
      <div className="moduleList">
        <input
          className="moduleSearchBar"
          placeholder="Search for module"
        ></input>

        <div className="modules">
          <Accordion defaultActiveKey={defaultActiveKey}>
            {modules?.map((module: any) => (
              <CourseModuleItem
                courseProgress={courseProgress}
                userRole={userRole}
                key={module._id}
                courseId={courseId}
                module={module}
              />
            ))}

            {userRole === ENUM_USER_ROLES.ADMIN && (
              <>
                <button
                  onClick={() => setAddModuleModalShow(true)}
                  className="btn btn-dark w-100"
                >
                  Add Module
                  <FontAwesomeIcon className="ms-2" icon={faFolderPlus} />
                </button>
                <AddModuleModal
                  courseId={courseId}
                  modalShow={addModuleModalShow}
                  setModalShow={setAddModuleModalShow}
                />
              </>
            )}
          </Accordion>
        </div>
      </div>
    </Col>
  );
};

export default ContentSidebar;
