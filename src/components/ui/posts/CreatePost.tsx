// Imports
import styles from "@/styles/CommunityPosts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { Form, Modal, Spinner } from "react-bootstrap";
import { useState } from "react";
import { IUser } from "@/types";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "@/graphql/posts";
import swal from "sweetalert";
import { handleCacheForAddingNewPost } from "@/helpers/graphql";
import { ENUM_POST_FILTERS } from "@/enums/post";
import { ENUM_USER_ROLES } from "@/enums/user";

const CreatePost = ({
  currentUser,
  filter,
}: {
  currentUser: IUser;
  filter: ENUM_POST_FILTERS;
}) => {
  const [addPostMutation] = useMutation(ADD_POST, {
    update: (cache, { data }) => {
      if (data && data.addPost.success) {
        const newPostData = data.addPost.data;
        const postFilter =
          filter === ENUM_POST_FILTERS.ADMIN_POSTS &&
          currentUser.role != ENUM_USER_ROLES.ADMIN
            ? ENUM_POST_FILTERS.PUBLIC_POSTS
            : filter;
        handleCacheForAddingNewPost(cache, newPostData, postFilter);
      }
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // States
  const [postModalShow, setPostModalShow] = useState<boolean>(false);
  const [postUploading, setPostUploading] = useState<boolean>(false);
  const [postRows, setPostRows] = useState<number>(3);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [postContent, setPostContent] = useState("");

  const handlePostContent = (e: any) => {
    setPostContent(e.target.value);

    const numberOfLineBreaks = (e.target.value.match(/\n/g) || []).length;
    if (numberOfLineBreaks > 3) {
      setPostRows(numberOfLineBreaks);
    } else {
      setPostRows(3);
    }
  };

  const onSubmit = async (data: any) => {
    setPostUploading(true);
    try {
      const result = await addPostMutation({
        variables: {
          post: data,
        },
      });
      const { message } = result.data.addPost;
      swal(message, "", "success");

      setPostUploading(false);
      setPostModalShow(false);
      reset();
    } catch (error) {
      console.log(error);
      swal("Something went wrong!", "", "error");
      setPostUploading(false);
    }
  };

  const handleMediaUploadOnChange = (event: any) => {
    setImage(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <button
        onClick={() => setPostModalShow(true)}
        className={`${styles.createPostBtn} rounded-pill`}
      >
        <span className="ms-2">
          What's on your mind, {currentUser.firstName} ?
        </span>
      </button>

      <Modal
        show={postModalShow}
        onHide={() => setPostModalShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="p-3">
          <Modal.Title id="contained-modal-title-vcenter">
            Post in our community
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body
            className={`modal-body ${styles.currentUserPostModalBody}`}
          >
            <Form.Group
              className="mt-2 mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                className={styles.currentUserPostTextarea}
                as="textarea"
                rows={postRows}
                placeholder={`What's on your mind, ${currentUser.firstName} ?`}
                {...register("content")}
                onChange={handlePostContent}
              />
            </Form.Group>
            {/* <div className="">
              {preview ? (
                <div className="h-100">
                  <img className="img-fluid" src={preview} alt="" />
                </div>
              ) : (
                <div
                  className={`${styles.postContentItems} rounded-3 d-flex align-items-center justify-content-between`}
                >
                  <p className="fw-bold mb-0">Add to your post</p>
                  <input
                    id="user-post-media"
                    type="file"
                    className="form-control border-0 d-none"
                    onChange={handleMediaUploadOnChange}
                  />
                  <label
                    className={styles.postContentItemsIcon}
                    htmlFor="user-post-media"
                  >
                    <FontAwesomeIcon icon={faImage} color="#45be62" />
                  </label>
                </div>
              )}
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            {postUploading ? (
              <button
                type="submit"
                className="btn btn-success w-100 disabled d-flex align-items-center justify-content-center"
              >
                <span className="m-0">Loading</span>
                <Spinner className="m-0 ms-2" animation="border" size="sm" />
              </button>
            ) : (
              <button type="submit" className="btn btn-success w-100">
                Post
              </button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePost;
