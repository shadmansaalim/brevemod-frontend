// Imports
import styles from "@/styles/CommunityPosts.module.css";
import { Container } from "react-bootstrap";

const PostSkeleton = () => {
  return (
    <div>
      <div className="placeholder-glow">
        <div className={styles.post}>
          <Container>
            <div className="d-flex justify-content-between align-items-start">
              <div className={styles.postUser}>
                <div style={{ padding: "2px" }}>
                  <svg
                    className="bd-placeholder-img placeholder rounded-pill card-img-top"
                    width="40px"
                    height="40px"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#868e96"></rect>
                  </svg>
                </div>
                <div className="col-7">
                  <span className="m-0 ms-2 placeholder col-9"></span>
                  <span className="m-0 ms-2 placeholder col-5"></span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <p className={styles.postContent}>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
                <span className="placeholder col-8"></span>
              </p>
            </div>
          </Container>
          <hr className="m-0 mt-2" />
          <div className={styles.postFooter}>
            <a
              href="#"
              className="btn btn-secondary ms-2 disabled placeholder w-100"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
