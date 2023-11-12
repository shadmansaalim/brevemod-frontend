// Imports
import { IModuleContent, ResponseSuccessType } from "@/types";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";
import { useAddContentToModuleMutation } from "@/redux/api/courseModuleApi";

const AddContentModal = ({ moduleId, modalShow, setModalShow }: any) => {
  // Add Content Hook
  const [addContent] = useAddContentToModuleMutation();

  // States
  const [contentData, setContentData] = useState<IModuleContent | null>(null);
  const [contentUploading, setContentUploading] = useState<boolean>(false);

  const handleOnChange = (e: any) => {
    const field = e.target.name as keyof IModuleContent;
    let value: string | number | undefined = e.target.value;

    if (field === "duration") {
      value = e.target.value !== "" ? parseInt(e.target.value) : undefined;
    }
    const newContentData = { ...contentData, [field]: value };
    setContentData(newContentData as IModuleContent);
  };

  const handleAddContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContentUploading(true);
    try {
      const payload = {
        moduleId,
        contentData,
      };
      const res: ResponseSuccessType = await addContent(payload).unwrap();
      if (res?.success) {
        swal(res.message, "", "success");
        setContentUploading(false);
        setContentData(null);
        setModalShow(false);
      }
    } catch (err) {
      setContentUploading(false);
      swal(err.message, "", "error");
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddContent}>
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
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="type"
              label="Content Type"
              className="mb-3"
            >
              <Form.Select
                name="type"
                onChange={handleOnChange}
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select content type
                </option>
                <option value="video">Video</option>
                <option value="quiz">Quiz</option>
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
              <button className="btn btn-success mt-3 w-100" type="submit">
                Add Content
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddContentModal;
