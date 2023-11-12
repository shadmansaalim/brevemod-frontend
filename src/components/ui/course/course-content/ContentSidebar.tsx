// Imports
import { Col, ProgressBar, Accordion } from "react-bootstrap";
import { useState } from "react";
import { ICourseModule, IUserCourseProgress } from "@/types";
import { ENUM_USER_ROLES } from "@/enums/user";
import CourseModuleItem from "./CourseModuleItem";

// Props Type
type IContentSidebarProps = {
  courseProgress: IUserCourseProgress;
  modules: ICourseModule[];
  courseId: string;
  defaultActiveKey?: string;
};

const ContentSidebar = ({
  courseProgress,
  modules,
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
          <Accordion defaultActiveKey={defaultActiveKey || ""}>
            {modules?.map((module: any) => (
              <CourseModuleItem
                courseProgress={courseProgress}
                key={module._id}
                courseId={courseId}
                module={module}
              />
            ))}
          </Accordion>
        </div>
      </div>
    </Col>
  );
};

export default ContentSidebar;
