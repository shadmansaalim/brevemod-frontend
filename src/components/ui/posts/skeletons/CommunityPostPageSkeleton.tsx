// Imports
import styles from "@/styles/CommunityPosts.module.css";
import { Container } from "react-bootstrap";
import PostSkeleton from "./PostSkeleton";

const CommunityPostsPageSkeleton = () => {
  return (
    <div className={styles.postsPageWrapper}>
      <Container className="col-12 col-lg-6 mx-auto py-5 placeholder-glow">
        <div
          className={`${styles.createPost} placeholder w-100 shadow-lg rounded-3 p-3 mx-auto`}
        >
          <div className="d-flex flex-column flex-md-row align-items-center">
            <img src="/ProfileIcon.png" width="40px" height="40px" />
            <a
              href="#"
              className="btn btn-secondary rounded-pill ms-2 disabled placeholder w-100 mt-2 mt-md-0"
            ></a>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row align-items-start my-3">
          <a
            href="#"
            className="btn btn-success rounded-pill me-2 disabled placeholder col-2"
          ></a>

          <a
            href="#"
            className="btn btn-success rounded-pill me-2 disabled placeholder col-3 mt-2 mt-md-0"
          ></a>

          <a
            href="#"
            className="btn btn-success rounded-pill disabled placeholder col-2 mt-2 mt-md-0"
          ></a>
        </div>

        <section className="mt-5 rounded-3 mx-auto">
          {[...Array(5).keys()].map((index: number) => (
            <PostSkeleton key={index} />
          ))}
        </section>
      </Container>
    </div>
  );
};

export default CommunityPostsPageSkeleton;
