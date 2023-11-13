// Imports
import { IModuleContent, ResponseSuccessType } from "@/types";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import { useUpdateContentInModuleMutation } from "@/redux/api/courseModuleApi";
import { isObjectFieldValuesEqual } from "@/utils/common";

type IEditContentModalProps = {
  content: IModuleContent;
  moduleId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const EditContentModal = ({
  content,
  moduleId,
  modalShow,
  setModalShow,
}: IEditContentModalProps) => {
  // Update Content Hook
  const [updateContent] = useUpdateContentInModuleMutation();

  // States
  const [contentData, setContentData] = useState<IModuleContent | null>({
    ...content,
  });
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [contentUploading, setContentUploading] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    const field = e.target.name as keyof IModuleContent;
    let value: string | number | undefined = e.target.value;

    if (field === "duration") {
      value = e.target.value !== "" ? parseInt(e.target.value) : undefined;
    }
    const newContentData = { ...contentData, [field]: value };
    setContentData(newContentData as IModuleContent);

    if (isObjectFieldValuesEqual(newContentData, content)) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
  };

  const handleUpdateContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContentUploading(true);
    try {
      const payload = {
        moduleId,
        contentId: content._id,
        contentData,
      };
      const res: ResponseSuccessType = await updateContent(payload).unwrap();
      if (res?.success) {
        swal(res.message, "", "success");
        setContentUploading(false);
        setContentData(null);
        setModalShow(false);
      }
    } catch (err: any) {
      setContentUploading(false);
      swal(err?.message, "", "error");
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateContent}>
            <FloatingLabel
              controlId="title"
              label="Content Title"
              className="mb-3"
            >
              <Form.Control
                required
                name="title"
                type="text"
                onChange={handleOnChange}
                placeholder="Content Title"
                defaultValue={content?.title}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="type"
              label="Content Type"
              className="mb-3"
            >
              <Form.Select name="type" onChange={handleOnChange} required>
                <option value="" disabled>
                  Select content type
                </option>
                <option value="video" selected={content?.type === "video"}>
                  Video
                </option>
                <option value="quiz" selected={content?.type === "quiz"}>
                  Quiz
                </option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel
              controlId="link"
              label="Content Link"
              className="mb-3"
            >
              <Form.Control
                required
                name="link"
                type="text"
                onChange={handleOnChange}
                placeholder="Content Link"
                defaultValue={content?.link}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="duration"
              label="Content Duration"
              className="mb-3"
            >
              <Form.Control
                required
                name="duration"
                type="number"
                onChange={handleOnChange}
                placeholder="Content Duration"
                defaultValue={content?.duration}
              />
            </FloatingLabel>
            {contentUploading ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Uploading...
              </button>
            ) : (
              <button
                disabled={isChanged ? false : true}
                className="btn btn-success mt-3 w-100"
                type="submit"
              >
                Update Content
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditContentModal;
