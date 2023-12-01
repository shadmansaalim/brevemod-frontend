// Imports
import RootLayout from "@/components/Layouts/RootLayout";
import type { ReactElement } from "react";
import { useState } from "react";
import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmericas,
  faUser,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/CommunityPosts.module.css";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "@/graphql/posts";
import SinglePostUi from "@/components/ui/posts/SinglePostUi";
import { IPost, IUser } from "@/types";
import CreatePost from "@/components/ui/posts/CreatePost";
import { useAppSelector } from "@/redux/hooks";
import CommunityPostsPageSkeleton from "../components/ui/posts/skeletons/CommunityPostPageSkeleton";
import { useEffect } from "react";
import { ENUM_POST_FILTERS } from "@/enums/post";

const CommunityPostsPage = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [postsFiltered, setPostsFiltered] = useState(
    ENUM_POST_FILTERS.PUBLIC_POSTS
  );

  const { loading, data, refetch } = useQuery(GET_POSTS, {
    variables: { filter: postsFiltered },
  });

  const handleEditPost = () => {};

  const handleFilterPosts = (filter: ENUM_POST_FILTERS) => {
    setPostsFiltered(filter);
  };

  useEffect(() => {
    refetch();
  }, [postsFiltered]);

  return (
    <>
      {loading ? (
        <CommunityPostsPageSkeleton />
      ) : (
        <div className={styles.postsPageWrapper}>
          <Container className="col-12 col-lg-6 mx-auto py-5">
            {currentUser && (
              <div
                className={`${styles.createPost} shadow-lg rounded-3 p-3 mx-auto`}
              >
                <div className="d-flex align-items-center">
                  <div className={styles.postUserImg}>
                    <img src="/ProfileIcon.png" width="40px" height="40px" />
                  </div>
                  <CreatePost
                    currentUser={currentUser}
                    filter={postsFiltered}
                  />
                </div>
              </div>
            )}
            <div className="d-flex align-items-start my-3">
              <button
                onClick={() =>
                  handleFilterPosts(ENUM_POST_FILTERS.PUBLIC_POSTS)
                }
                className={`btn rounded-pill me-2 ${
                  postsFiltered === ENUM_POST_FILTERS.PUBLIC_POSTS
                    ? `btn-success`
                    : `btn-outline-success`
                }`}
              >
                Public
                <FontAwesomeIcon className="ms-2" icon={faEarthAmericas} />
              </button>
              <button
                onClick={() => handleFilterPosts(ENUM_POST_FILTERS.ADMIN_POSTS)}
                className={`btn rounded-pill me-2 ${
                  postsFiltered === ENUM_POST_FILTERS.ADMIN_POSTS
                    ? `btn-success`
                    : `btn-outline-success`
                }`}
              >
                Admin Posts
                <FontAwesomeIcon className="ms-2" icon={faUserGroup} />
              </button>
              <button
                onClick={() => handleFilterPosts(ENUM_POST_FILTERS.MY_POSTS)}
                className={`btn rounded-pill ${
                  postsFiltered === ENUM_POST_FILTERS.MY_POSTS
                    ? `btn-success`
                    : `btn-outline-success`
                }`}
              >
                My Posts
                <FontAwesomeIcon className="ms-2" icon={faUser} />
              </button>
            </div>
            {data?.posts?.data?.length > 0 ? (
              <section className="mt-5 rounded-3 mx-auto">
                {data.posts.data.map((post: IPost) => (
                  <SinglePostUi
                    key={post._id}
                    post={post}
                    currentUser={currentUser as IUser}
                    handleEditPost={handleEditPost}
                    handleDeletePost={() => {}}
                  />
                ))}
              </section>
            ) : (
              <section className="mt-5 rounded-3 mx-auto">
                <div className="mx-auto shadow-lg mb-5 p-5 rounded-3 text-center">
                  <img
                    src="/Empty.svg"
                    className="img-fluid mb-3 col-6"
                    alt="No Posts"
                  />
                  {postsFiltered === ENUM_POST_FILTERS.PUBLIC_POSTS && (
                    <p>There are no posts in our community yet.</p>
                  )}
                  {postsFiltered === ENUM_POST_FILTERS.ADMIN_POSTS && (
                    <p>There are no posts from Admins yet.</p>
                  )}
                  {postsFiltered === ENUM_POST_FILTERS.MY_POSTS && (
                    <p>
                      You didn't post anything yet. Make your first post today
                      to the community.
                    </p>
                  )}
                </div>
              </section>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default CommunityPostsPage;

CommunityPostsPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
