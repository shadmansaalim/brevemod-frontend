// Imports
import {
  useCreateModuleMutation,
  useUpdateModuleMutation,
} from "@/redux/api/courseModuleApi";
import { ICourseModule, ResponseSuccessType } from "@/types";
import { Modal, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";
import swal from "sweetalert";

type IEditModuleModalProps = {
  module: ICourseModule;
  courseId: string;
  modalShow: boolean;
  setModalShow: (state: boolean) => void;
};

const EditModuleModal = ({
  module,
  courseId,
  modalShow,
  setModalShow,
}: IEditModuleModalProps) => {
  // Create Module hook
  const [updateModule] = useUpdateModuleMutation();
  // States
  const [moduleName, setModuleName] = useState<string>(
    module?.moduleName || ""
  );
  const [moduleUpdating, setModuleUpdating] = useState<boolean>(false);

  const handleCreateModule = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModuleUpdating(true);
    try {
      const payload = {
        moduleName,
        moduleId: module._id,
      };
      const res: ResponseSuccessType = await updateModule({
        ...payload,
      }).unwrap();

      if (res?.success) {
        swal(res.message, "", "success");
        setModuleUpdating(false);
        setModuleName("");
        setModalShow(false);
      }
    } catch (err: any) {
      setModuleUpdating(false);
      swal(err?.message, "", "error");
    }
  };

  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Module {module?.moduleNumber}</Modal.Title>
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
                defaultValue={module?.moduleName}
              />
            </FloatingLabel>

            {moduleUpdating ? (
              <button className="btn btn-success w-100 mt-3" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Updating...
              </button>
            ) : (
              <button
                disabled={moduleName === module?.moduleName}
                className="btn btn-success mt-3 w-100"
                type="submit"
              >
                Update Module
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModuleModal;
