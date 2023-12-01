import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faEllipsisVertical,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Container, Dropdown } from "react-bootstrap";
import { getUserFullName } from "@/utils/common";
import styles from "@/styles/CommunityPosts.module.css";
import { ENUM_USER_ROLES } from "@/enums/user";
import { IPost, IUser } from "@/types";
import ReactionPopover from "./ReactionPopover";
import { ENUM_POST_REACTIONS } from "@/enums/post";
import { PostReactionCountsSideIcons } from "@/utils/reaction";
import { REACT_POST, REMOVE_REACTION_FROM_POST } from "@/graphql/posts";
import { useMutation } from "@apollo/client";
import { handleCacheForPostReaction } from "@/helpers/graphql";

type ISinglePostUiProps = {
  post: IPost;
  currentUser: IUser;
  handleEditPost: any;
  handleDeletePost: any;
};

const SinglePostUi = ({
  post,
  currentUser,
  handleEditPost,
  handleDeletePost,
}: ISinglePostUiProps) => {
  const dateInstance = new Date(post.createdAt / 1);
  const postPublishingDate = dateInstance.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // React Post Mutation
  const [reactPostMutation] = useMutation(REACT_POST, {
    update: (cache, { data }) => {
      if (data && data.reactPost.success) {
        const updatedPostData = data.reactPost.data;
        handleCacheForPostReaction(cache, updatedPostData);
      }
    },
  });
  const [removeReactionFromPost] = useMutation(REMOVE_REACTION_FROM_POST, {
    update: (cache, { data }) => {
      if (data && data.removeReactionFromPost.success) {
        const updatedPostData = data.removeReactionFromPost.data;
        handleCacheForPostReaction(cache, updatedPostData);
      }
    },
  });

  // States
  const [showReactionBox, setShowReactionBox] = useState(false);

  const handlePostReaction = async (reaction: ENUM_POST_REACTIONS) => {
    const reactionAudio = new Audio("/like.mp3");

    try {
      const result = await reactPostMutation({
        variables: {
          postId: post._id,
          reaction,
        },
      });
      reactionAudio.addEventListener("canplaythrough", () => {
        reactionAudio.play();
      });

      reactionAudio.load();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemovePostReaction = async () => {
    const reactionAudio = new Audio("/like.mp3");
    try {
      const result = await removeReactionFromPost({
        variables: {
          postId: post._id,
        },
      });
      reactionAudio.addEventListener("canplaythrough", () => {
        reactionAudio.play();
      });

      reactionAudio.load();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div className={styles.post}>
          <Container>
            <div className="d-flex justify-content-between align-items-start">
              <div className={styles.postUser}>
                <div>
                  <img
                    className="rounded-circle m-0"
                    src="/ProfileIcon.png"
                    alt={getUserFullName(post.author)}
                    width="40px"
                    height="40px"
                  />
                </div>
                <div className="ms-2">
                  <Card.Title className="m-0 d-flex align-items-center">
                    <small className="m-0">
                      {getUserFullName(post.author)}
                    </small>
                    {post.author.role === ENUM_USER_ROLES.ADMIN && (
                      <button
                        className="btn-sm btn m-0 ms-2"
                        style={{
                          backgroundColor: "#dae5e0",
                          padding: "3px 6px",
                        }}
                      >
                        Admin
                        <FontAwesomeIcon
                          className="ms-1 pt-1"
                          icon={faCircleCheck}
                        />
                      </button>
                    )}
                  </Card.Title>
                  <small className="m-0">{postPublishingDate}</small>
                </div>
              </div>
              {/* {
                // Only letting the post owner to edit or delete post
                currentUser._id === post.author._id && (
                  <div className="d-flex align-items-start">
                    <span onClick={(event) => {}}>
                      <FontAwesomeIcon color="#6c757d" icon={faEdit} />
                    </span>
                    <span className="ms-2" onClick={(event) => {}}>
                      <FontAwesomeIcon color="#dc3545" icon={faTrash} />
                    </span>
                  </div>
                )
              } */}
            </div>
            <div className="mt-3">
              <p className={styles.postContent}>{post.content}</p>
              {/* {post.image.length > 0 && (
                <img
                  className="img-fluid"
                  src={post.image}
                  alt={post.name + " Post"}
                />
              )} */}
            </div>
            <div className={styles.postInteractions}>
              <div>
                {post?.reactions?.length > 0 && (
                  <div className="d-flex align-items-center">
                    <PostReactionCountsSideIcons />
                    <small className="m-0 ms-1">{post.reactions.length}</small>
                  </div>
                )}
              </div>
            </div>
          </Container>
          <hr className="m-0 mt-2" />
          <div className={styles.postFooter}>
            <ReactionPopover
              reaction={post.reactions.find(
                (reaction) => reaction.user === currentUser?._id
              )}
              showReactionBox={showReactionBox}
              setShowReactionBox={setShowReactionBox}
              handlePostReaction={handlePostReaction}
              handleRemovePostReaction={handleRemovePostReaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostUi;
