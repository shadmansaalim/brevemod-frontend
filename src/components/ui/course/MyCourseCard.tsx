// Imports
import Rating from "react-rating";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faForward } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import { ICourse, ResponseSuccessType } from "@/types";
import {
  useCourseProgressQuery,
  useStartCourseMutation,
} from "@/redux/api/courseProgressApi";
import { useIsCourseContentPublishedQuery } from "@/redux/api/courseModuleApi";
import { useEffect } from "react";
import { useRouter } from "next/router";

const MyCourseCard = ({ course }: { course: ICourse }) => {
  const {
    data: courseContentPublishData,
    isLoading: courseContentPublishDataLoading,
  } = useIsCourseContentPublishedQuery(course._id);
  const isCourseContentPublished = courseContentPublishData?.data;

  const [startCourse] = useStartCourseMutation();

  const {
    data: courseProgressData,
    refetch,
    isLoading: courseProgressDataLoading,
  } = useCourseProgressQuery(course._id);
  const courseProgress = courseProgressData?.data;

  const [isCourseStarted, setIsCourseStarted] = useState<boolean>(
    courseProgress ? true : false
  );

  const router = useRouter();

  useEffect(() => {
    if (courseProgress) {
      setIsCourseStarted(true);
    } else {
      setIsCourseStarted(false);
    }
  }, [courseProgressData]);

  const handleStartCourse = async () => {
    try {
      const res: ResponseSuccessType = await startCourse(course._id).unwrap();
      console.log(res);
      if (res?.success) {
        refetch();
        setIsCourseStarted(true);
        swal(res.message, "", "success");
      }
    } catch (err) {
      swal(err.message, "", "error");
    }
  };

  const handleContinueCourse = async () => {
    const { courseId } = courseProgress;
    const { moduleId, contentId } = courseProgress.current;
    const navigateContentRoute = `/course-content/${courseId}/${moduleId}/${contentId}`;
    router.push(navigateContentRoute);
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img src={course.thumbnailLink} className="card-img-top" alt="..." />
        <div className="card-body course d-flex flex-column justify-content-around">
          <p className="card-title fw-bold">{course.title}</p>
          <div className="card-text">
            <small>{course.instructorName}</small>
            <br />
            <div className="progress col-10 mx-auto mt-2">
              <div
                className="progress-bar "
                role="progressbar"
                style={{ width: "25%" }}
                aria-valuenow={25}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                25%
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer ">
          {isCourseContentPublished ? (
            <>
              {isCourseStarted ? (
                <button
                  onClick={handleContinueCourse}
                  className="btn btn-primary w-100"
                >
                  Continue Course
                  <FontAwesomeIcon className="ms-1" icon={faForward} />
                </button>
              ) : (
                <button
                  onClick={handleStartCourse}
                  className="btn btn-outline-primary w-100"
                >
                  Start Course
                  <FontAwesomeIcon className="ms-1" icon={faCirclePlay} />
                </button>
              )}
            </>
          ) : (
            <>
              <button disabled className="btn btn-secondary w-100">
                Content Unavailable
                <FontAwesomeIcon className="ms-1" icon={faForward} />
              </button>
            </>
          )}
          {}
        </div>
      </div>
    </div>
  );
};

export default MyCourseCard;
