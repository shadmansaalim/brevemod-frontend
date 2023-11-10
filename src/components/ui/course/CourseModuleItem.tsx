// Imports
import React, { useState } from "react";
import { Card, Accordion, useAccordionButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faLock } from "@fortawesome/free-solid-svg-icons";
// import VideoButton from "../VideoButton/VideoButton";
import { useRouter } from "next/router";
import { ICourseModule } from "@/types";

const CourseModuleItem = ({
  courseId,
  module,
}: {
  courseId: string;
  module: ICourseModule;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleModuleClick = useAccordionButton(module._id, () => {
    setIsOpen(!isOpen);
  });

  const handleContentClick = (contentId: number) => {
    const moduleContentRoute = `/course-content/${courseId}/${module._id}/${contentId}`;
    router.push(moduleContentRoute);
  };

  return (
    <Card className="moduleCard">
      <Card.Header
        onClick={handleModuleClick}
        className="d-flex justify-content-between align-items-center"
      >
        <p className="mb-0 module-title">{module?.moduleName}</p>
        <button className="btn btn-success">
          {isOpen ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </Card.Header>
      <Accordion.Collapse eventKey={module._id}>
        <Card.Body>
          {module?.moduleContents?.map((content: any) => (
            <button
              className="moduleContentBtn"
              onClick={() => handleContentClick(content._id)}
            >
              <span className="d-flex align-items-center">
                <FontAwesomeIcon
                  color="#2A4A5F"
                  className="me-1"
                  icon={faLock}
                />
                <p className="mb-0">{content?.title}</p>
              </span>
              <span>{content.duration}m</span>
            </button>
          ))}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CourseModuleItem;
