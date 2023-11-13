// Imports
import { useCreateModuleMutation } from "@/redux/api/courseModuleApi";
import { ResponseSuccessType } from "@/types";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";

type IAddModuleModalProps = {
  courseId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const AddModuleModal = ({
  courseId,
  modalShow,
  setModalShow,
}: IAddModuleModalProps) => {
  // Create Module hook
  const [createModule] = useCreateModuleMutation();
  // States
  const [moduleName, setModuleName] = useState<string>("");
  const [moduleCreating, setModuleCreating] = useState<boolean>(false);

  const handleCreateModule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModuleCreating(true);
    try {
      const moduleCreateData = { courseId, moduleName };
      const res: ResponseSuccessType = await createModule({
        ...moduleCreateData,
      }).unwrap();

      if (res?.success) {
        swal(res.message, "", "success");
        setModuleCreating(false);
        setModuleName("");
        setModalShow(false);
      }
    } catch (err: any) {
      setModuleCreating(false);
      swal(err?.message, "", "error");
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateModule}>
            <FloatingLabel
              controlId="moduleName"
              label="Name of module"
              className="mb-3"
            >
              <Form.Control
                required
                name="moduleName"
                type="text"
                onChange={(e) => setModuleName(e.target.value)}
              />
            </FloatingLabel>

            {moduleCreating ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Creating...
              </button>
            ) : (
              <button className="btn btn-success mt-3 w-100" type="submit">
                Create Module
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddModuleModal;
