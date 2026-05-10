import { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Spinner,
  Card,
  Badge,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faPaperPlane,
  faExternalLinkAlt,
  faRotateLeft,
  faGraduationCap,
  faStar,
  faVideo,
  faFolderOpen,
  faUsers,
  faCheckCircle,
  faServer,
  faBrain,
  faSearchPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useGetAICourseSuggestionsMutation } from "@/redux/api/courseApi";
import { useRouter } from "next/router";
import { ResponseSuccessType } from "@/types";
import swal from "sweetalert";

interface AISuggestionsModalProps {
  show: boolean;
  onClose: () => void;
}

// Updated interface to exactly match the requested schema properties + reason field
export interface CourseSuggestion {
  _id: string;
  title: string;
  description: string;
  instructorName: string;
  totalRating: number;
  ratingCount: number;
  avgRating: number;
  price: number;
  thumbnailLink: string;
  introVideoLink: string;
  lecturesCount: number;
  projectsCount: number;
  studentsCount: number;
  reason: string;
}

const MAX_CHAR_LENGTH = 500;

const loadingPhases = [
  {
    title: "Connecting to AI...",
    desc: "Starting up the model and establishing a connection.",
    icon: faServer,
    progress: 15,
  },
  {
    title: "Analyzing Your Requirements...",
    desc: "Identifying key skills, frameworks, and experience level from your input.",
    icon: faBrain,
    progress: 40,
  },
  {
    title: "Searching Course Catalog...",
    desc: "Matching requirements against available courses, projects, and instructors.",
    icon: faSearchPlus,
    progress: 70,
  },
  {
    title: "Preparing Your Results...",
    desc: "Writing personalized explanations for why each course fits your goals.",
    icon: faRobot,
    progress: 95,
  },
];

const AISuggestionsModal = ({ show, onClose }: AISuggestionsModalProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [suggestions, setSuggestions] = useState<CourseSuggestion[]>([]);

  const [getAICourseSuggestions] = useGetAICourseSuggestionsMutation();

  // Character count state
  const [charCount, setCharCount] = useState(0);

  const router = useRouter();

  // Manage sequential multi-phase progress to entertain user during slow backend inference
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingPhases.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Update character count when job description changes
  useEffect(() => {
    setCharCount(jobDescription.length);
  }, [jobDescription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim()) return;

    setIsLoading(true);
    setLoadingStep(0);

    try {
      const res: ResponseSuccessType = await getAICourseSuggestions({
        jobDescription,
      }).unwrap();

      if (res.success) setSuggestions(res.data);
      else swal("Something went wrong", res.message, "error");
    } catch (error) {
      console.log({ error });
      swal(
        "Unable to Generate Suggestions",
        "Our AI service is currently experiencing high demand. Please wait a moment and try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const handleReset = () => {
    setJobDescription("");
    setSuggestions([]);
    setLoadingStep(0);
    setCharCount(0);
  };

  const navigateToCoursePage = (courseId: string) => {
    window.open(`/courses/${courseId}`, "_blank", "noopener,noreferrer");
  };

  // Determine character count color based on proximity to limit
  const getCharCountColor = () => {
    if (charCount >= MAX_CHAR_LENGTH) return "text-danger fw-bold";
    if (charCount >= MAX_CHAR_LENGTH * 0.8) return "text-warning fw-semibold";
    return "text-muted";
  };

  return (
    <Modal show={show} onHide={onClose} size="xl" centered scrollable>
      <Modal.Header
        closeButton
        style={{
          background: "linear-gradient(135deg, #006b5a 0%, #161c2d 100%)",
          color: "#fff",
        }}
      >
        <Modal.Title className="d-flex align-items-center gap-2 fw-bold">
          <FontAwesomeIcon icon={faRobot} size="lg" /> Ask AI Course Advisor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 bg-light">
        <Card className="border-0 shadow-sm mb-4 p-3 rounded-3">
          <Card.Body>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <p className="text-muted mb-0">
                Paste your target job description or list of required
                competencies below. Our embedded AI analyzer extracts key
                capabilities and matches them against rich metrics.
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="aiJobInput">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Form.Label className="fw-semibold text-dark mb-0">
                    Job Description / Competency Input
                  </Form.Label>
                  {/* Character Count Display */}
                  <span className={`small ${getCharCountColor()}`}>
                    <FontAwesomeIcon
                      icon={faRobot}
                      className="me-1"
                      size="xs"
                    />
                    {charCount} / {MAX_CHAR_LENGTH} characters
                  </span>
                </div>
                <Form.Control
                  maxLength={MAX_CHAR_LENGTH}
                  as="textarea"
                  rows={4}
                  placeholder="e.g. Seeking a Web Developer with experience in Typescript and Next.js"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  style={{ resize: "none" }}
                  disabled={isLoading}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button
                  type="submit"
                  variant="success"
                  disabled={!jobDescription.trim() || isLoading}
                  className="px-4 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                  style={{ background: "#006b5a", borderColor: "#006b5a" }}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Analyzing Key Terms...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} /> Generate
                      Recommendations
                    </>
                  )}
                </Button>

                {suggestions.length > 0 && !isLoading && (
                  <Button
                    variant="outline-secondary"
                    onClick={handleReset}
                    className="d-flex align-items-center gap-1"
                  >
                    <FontAwesomeIcon icon={faRotateLeft} /> Reset Analyzer
                  </Button>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Dynamic Multi-Phase Loading Interface designed to alleviate free backend latencies */}
        {isLoading && (
          <Card className="border-0 shadow-sm my-4 rounded-3 p-4 bg-white text-center">
            <Card.Body>
              <div className="mb-4 d-flex justify-content-center">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center bg-success-subtle text-success p-4 animate-bounce"
                  style={{ width: "90px", height: "90px", fontSize: "2rem" }}
                >
                  <FontAwesomeIcon
                    icon={loadingPhases[loadingStep].icon}
                    spin={loadingStep === 0}
                  />
                </div>
              </div>

              <h4 className="fw-bold text-dark mb-2">
                Phase {loadingStep + 1} of {loadingPhases.length}:{" "}
                {loadingPhases[loadingStep].title}
              </h4>
              <p className="text-muted small max-w-md mx-auto mb-4">
                {loadingPhases[loadingStep].desc}
              </p>

              <div className="max-w-lg mx-auto mb-3">
                <ProgressBar
                  animated
                  now={loadingPhases[loadingStep].progress}
                  variant="warning"
                  className="rounded-pill"
                  style={{ height: "12px" }}
                />
              </div>

              <div className="d-flex justify-content-center gap-2 flex-wrap mt-3 text-start small">
                {loadingPhases.map((phase, idx) => (
                  <Badge
                    key={idx}
                    bg={
                      idx < loadingStep
                        ? "success"
                        : idx > loadingStep
                        ? "dark"
                        : "warning"
                    }
                    text="white"
                    className="p-2 border"
                  >
                    {idx < loadingStep && (
                      <FontAwesomeIcon icon={faCheckCircle} className="me-1" />
                    )}
                    {idx + 1}. {phase.title.replace("...", "")}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 pt-3 border-top text-muted small">
                <Spinner
                  animation="grow"
                  size="sm"
                  variant="success"
                  className="me-2"
                />
                <em>
                  Note: Using Free AI model which takes 2-3 minutes. Thank you
                  for your patience!
                </em>
              </div>
            </Card.Body>
          </Card>
        )}

        {!isLoading && suggestions.length > 0 && (
          <div>
            <h5 className="fw-bold pb-2 mb-3 text-success border-bottom border-success-subtle">
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              Tailored Course Matches ({suggestions.length})
            </h5>
            <div className="d-flex flex-column gap-4">
              {suggestions.map((course) => (
                <Card
                  key={course._id}
                  className="shadow-sm border-0 bg-white rounded-3 overflow-hidden border border-success-subtle"
                >
                  <Row className="g-0 align-items-center">
                    <Col md={4} className="position-relative h-100">
                      <img
                        src={course.thumbnailLink}
                        alt={course.title}
                        className="img-fluid w-100 h-100 object-fit-cover"
                        style={{ minHeight: "220px" }}
                      />
                      <Badge
                        bg="dark"
                        className="position-absolute top-0 start-0 m-2 bg-opacity-75 fs-6 shadow-sm"
                      >
                        ${course.price.toFixed(2)}
                      </Badge>
                      {course.introVideoLink && (
                        <span className="position-absolute bottom-0 start-0 m-2 badge bg-success small shadow-sm">
                          ▶ Intro Video Included
                        </span>
                      )}
                    </Col>
                    <Col md={8}>
                      <Card.Body className="p-4 d-flex flex-column h-100 justify-content-between">
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h4 className="fw-bold text-dark mb-1">
                              {course.title}
                            </h4>
                          </div>

                          <div className="text-muted small mb-2">
                            <span className="fw-medium text-dark me-3">
                              👨‍🏫 {course.instructorName}
                            </span>
                            <Badge
                              bg="warning"
                              text="dark"
                              className="fw-bold me-2 shadow-2xs"
                            >
                              <FontAwesomeIcon
                                icon={faStar}
                                className="me-1 text-danger"
                              />
                              {course.avgRating.toFixed(1)}
                            </Badge>
                          </div>

                          <div className="d-flex flex-wrap gap-3 mb-3 bg-light p-2 rounded-2 small text-secondary">
                            <div>
                              <FontAwesomeIcon
                                icon={faVideo}
                                className="me-1 text-success"
                              />
                              <strong>{course.lecturesCount}</strong> Lectures
                            </div>
                            <div>
                              <FontAwesomeIcon
                                icon={faFolderOpen}
                                className="me-1 text-primary"
                              />
                              <strong>{course.projectsCount}</strong> Portfolio
                              Projects
                            </div>
                            <div>
                              <FontAwesomeIcon
                                icon={faUsers}
                                className="me-1 text-info"
                              />
                              <strong>
                                {course.studentsCount.toLocaleString()}
                              </strong>{" "}
                              Enrolled Active
                            </div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                          <span className="fs-4 fw-bold text-success">
                            ${course.price.toFixed(2)}
                          </span>
                          <Button
                            variant="success"
                            className="fw-semibold px-4 d-flex align-items-center gap-2"
                            style={{
                              backgroundColor: "#006b5a",
                              borderColor: "#006b5a",
                            }}
                            onClick={() => navigateToCoursePage(course._id)}
                          >
                            Explore Full Syllabus{" "}
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                          </Button>
                        </div>
                      </Card.Body>
                    </Col>
                  </Row>

                  {/* Highlighting exactly why this matches the job input */}
                  <div className="bg-success-subtle text-success-emphasis rounded-3 small p-3 m-3 border border-success-subtle shadow-2xs">
                    <strong className="d-block mb-1 text-success">
                      <FontAwesomeIcon icon={faRobot} className="me-1" /> Why
                      this matches your job input:
                    </strong>
                    <span className="fst-italic">{course.reason}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {!isLoading && suggestions.length === 0 && (
          <div className="text-center py-5 text-muted bg-white rounded-3 border border-light shadow-sm">
            <FontAwesomeIcon
              icon={faRobot}
              size="3x"
              className="mb-3 opacity-25"
            />
            <h5 className="fw-bold text-secondary">Awaiting Parameters</h5>
            <p className="mb-0 small max-w-md mx-auto">
              Please paste input text above and trigger the AI suggestion
              builder to suggest you the best courses tailored specifically for
              your job.
            </p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#f8f9fa" }}>
        <Button
          variant="secondary"
          onClick={() => {
            handleReset();
            onClose();
          }}
          className="fw-semibold px-3"
        >
          Close Advisor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AISuggestionsModal;
