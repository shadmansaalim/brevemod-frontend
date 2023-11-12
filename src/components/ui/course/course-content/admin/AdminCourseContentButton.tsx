// Imports
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { IModuleContent } from "@/types";
import { useEffect } from "react";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

// Props Type
type IAdminCourseContentButtonProps = {
  courseId: string;
  moduleId: string;
  content: IModuleContent;
  handleContentClick: (contentId: string) => void;
};

const AdminCourseContentButton = ({
  courseId,
  moduleId,
  content,
  handleContentClick,
}: IAdminCourseContentButtonProps) => {
  const router = useRouter();

  const currentCourseId = router?.query?.courseId;
  const currentModuleId = router?.query?.moduleId;
  const currentContentId = router?.query?.contentId;

  const [isContentCurrent, setIsContentCurrent] = useState<boolean>(false);

  useEffect(() => {
    if (
      currentCourseId === courseId &&
      currentModuleId === moduleId &&
      currentContentId === content._id
    ) {
      setIsContentCurrent(true);
    }
  }, [router]);

  return (
    <>
      {isContentCurrent ? (
        <button className="currentModuleContentBtn">
          <span className="d-flex align-items-center">
            <FontAwesomeIcon
              color="#006B5A"
              className="me-1"
              icon={faCirclePlay}
            />
            <p className="mb-0">{content?.title}</p>
          </span>
          <span>{content.duration}m</span>
        </button>
      ) : (
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
      )}
    </>
  );
};

export default AdminCourseContentButton;
