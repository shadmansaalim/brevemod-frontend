// Imports
import React, { useState } from "react";
import {
  Card,
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourseModule } from "@/types";
import CourseContentButton from "./CourseContentButton";
import AddContentModal from "./AddContentModal";
import { ENUM_USER_ROLES } from "@/enums/user";
import { useContext } from "react";
import { IUserCourseProgress } from "@/types";

const CourseModuleItem = ({
  courseProgress,
  userRole,
  courseId,
  module,
}: {
  courseProgress?: IUserCourseProgress;
  userRole: ENUM_USER_ROLES;
  courseId: string;
  module: ICourseModule;
}) => {
  // Router
  const router = useRouter();

  //States
  const [addContentModalShow, setAddContentModalShow] = useState(false);

  const handleModuleClick = useAccordionButton(module._id);
  const { activeEventKey } = useContext(AccordionContext);

  const isCurrentEventKey = activeEventKey === module._id;

  const handleContentClick = (contentId: string) => {
    const routePattern = `/course-content/${courseId}/[${module._id}]/[${contentId}]`;
    const routeUrl = `/course-content/${courseId}/${module._id}/${contentId}`;
    router.push(routePattern, routeUrl);
  };

  return (
    <Card className="moduleCard">
      <Card.Header
        onClick={handleModuleClick}
        className="d-flex justify-content-between align-items-center"
      >
        <p className="mb-0 module-title">{module?.moduleName}</p>
        <button className="btn btn-dark">
          {isCurrentEventKey ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </Card.Header>
      <Accordion.Collapse eventKey={module._id}>
        <Card.Body>
          {module?.moduleContents?.map((content: any) => (
            <CourseContentButton
              key={content._id}
              courseProgress={courseProgress}
              userRole={userRole}
              courseId={courseId}
              moduleId={module._id}
              content={content}
              handleContentClick={handleContentClick}
            />
          ))}
          {userRole === ENUM_USER_ROLES.ADMIN && (
            <>
              <button
                onClick={() => setAddContentModalShow(true)}
                className="btn w-100"
                style={{ backgroundColor: "#dae5e0" }}
              >
                Add Content
                <FontAwesomeIcon className="ms-2" icon={faFileArrowUp} />
              </button>
              <AddContentModal
                moduleId={module._id}
                modalShow={addContentModalShow}
                setModalShow={setAddContentModalShow}
              />
            </>
          )}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CourseModuleItem;
