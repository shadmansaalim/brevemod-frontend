// Imports
import React, { useState } from "react";
import { Card, Accordion, useAccordionButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { ICourseModule, IModuleContent } from "@/types";
import { useCourseProgressQuery } from "@/redux/api/courseProgressApi";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hooks";
import { ENUM_USER_ROLES } from "@/enums/user";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { IUserCourseProgress } from "@/types";

// Props Type
type ICourseContentProps = {
  courseProgress?: IUserCourseProgress;
  userRole: ENUM_USER_ROLES;
  courseId: string;
  moduleId: string;
  content: IModuleContent;
  handleContentClick: (contentId: string) => void;
};

const CourseContent = ({
  courseProgress,
  userRole,
  courseId,
  moduleId,
  content,
  handleContentClick,
}: ICourseContentProps) => {
  const router = useRouter();

  const currentCourseId = router?.query?.courseId;
  const currentModuleId = router?.query?.moduleId;
  const currentContentId = router?.query?.contentId;

  const [isContentLocked, setIsContentLocked] = useState<boolean>(true);
  const [isContentCurrent, setIsContentCurrent] = useState<boolean>(false);

  useEffect(() => {
    if (userRole) {
      if (
        currentCourseId === courseId &&
        currentModuleId === moduleId &&
        currentContentId === content._id
      ) {
        setIsContentCurrent(true);
      } else {
        if (userRole === ENUM_USER_ROLES.ADMIN) {
          setIsContentLocked(false);
        } else {
          if (courseProgress) {
            courseProgress.completed.forEach((checkContent: any) => {
              if (
                checkContent.moduleId === moduleId &&
                checkContent.contentId === content._id
              ) {
                setIsContentLocked(false);
                return;
              }
            });
          }
        }
      }
    }
  }, [courseProgress, userRole]);

  if (isContentCurrent) {
    return (
      <button className="currentModuleContentBtn">
        <span className="d-flex align-items-center">
          <FontAwesomeIcon color="white" className="me-1" icon={faCirclePlay} />
          <p className="mb-0">{content?.title}</p>
        </span>
        <span>{content.duration}m</span>
      </button>
    );
  } else if (isContentLocked) {
    return (
      <button className="moduleContentBtn">
        <span className="d-flex align-items-center">
          <FontAwesomeIcon color="#2A4A5F" className="me-1" icon={faLock} />
          <p className="mb-0">{content?.title}</p>
        </span>
        <span>{content.duration}m</span>
      </button>
    );
  } else {
    return (
      <button
        className="moduleContentBtn"
        onClick={() => handleContentClick(content._id)}
      >
        <span className="d-flex align-items-center">
          <FontAwesomeIcon
            color="#006B5A"
            className="me-1"
            icon={faCircleCheck}
          />
          <p className="mb-0">{content?.title}</p>
        </span>
        <span>{content.duration}m</span>
      </button>
    );
  }
};

export default CourseContent;
