// Imports
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import type { ReactElement } from "react";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { getTokenFromLocalStorage } from "@/utils/common";
import swal from "sweetalert";
import useAuth from "@/hooks/auth/useAuth";
import { useEffect } from "react";

const FeedbackPage = () => {
  const { currentUser } = useAuth();
  const [currentUserFeedback, setCurrentUserFeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/feedbacks/current-user`, {
      method: "GET",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          console.log(result);
          setCurrentUserFeedback(result?.data?.feedback);
        }
      });
  }, [currentUser]);

  const handleAddFeedback = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/feedbacks`, {
      method: "POST",
      headers: {
        Authorization: getTokenFromLocalStorage(),
        "content-type": "application/json",
      },
      body: JSON.stringify({ feedback }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setCurrentUserFeedback(result.data.feedback);
          swal(result.message, "", "success");
        }
      });
  };

  return (
    <Container className="mt-5">
      {currentUserFeedback?.length ? (
        <div className="text-center my-5 col-9 col-md-8 col-lg-6 mx-auto">
          <img
            src="/FeedbackIcon.svg"
            className="img-fluid col-8 col-md-6 mx-auto mb-4"
            alt="Feedback Icon"
          />
          <h1 className="display-3"> Thank You!</h1>
          <p className="lead">
            We have received your feedback and our team is continuously working
            hard to make Brevemod one of the best learning platform. We value
            your words and will be working on your feedback. Thank you for being
            a <strong className="ms-1">Brevemodian</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleAddFeedback}>
          <h1>Feedback Form</h1>
          <p>
            Feel free to add your valuable feedback about our courses and
            teaching.
          </p>
          <div className="form-floating mb-3">
            <textarea
              onChange={(e) => setFeedback(e.target.value)}
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingServiceDescription"
              style={{ height: "200px" }}
              name="feedback"
              required
            ></textarea>
            <label htmlFor="floatingServiceDescription">Feedback</label>
          </div>
          <div className="text-start"></div>
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      )}
    </Container>
  );
};

export default FeedbackPage;

FeedbackPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
