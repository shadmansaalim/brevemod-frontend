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
import { useContext } from "react";
import AdminCourseContentButton from "./AdminCourseContentButton";
import AddContentModal from "./AddContentModal";

const AdminCourseModuleItem = ({
  courseId,
  module,
}: {
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
    const routePattern = `/course-content/admin/${courseId}/[${module._id}]/[${contentId}]`;
    const routeUrl = `/course-content/admin/${courseId}/${module._id}/${contentId}`;
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
            <AdminCourseContentButton
              key={content._id}
              courseId={courseId}
              moduleId={module._id}
              content={content}
              handleContentClick={handleContentClick}
            />
          ))}
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
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default AdminCourseModuleItem;
