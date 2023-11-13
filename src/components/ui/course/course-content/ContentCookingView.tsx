// Imports
import { Col } from "react-bootstrap";

const ContentCookingView = () => {
  return (
    <Col className="col-12 col-lg-8 mb-4 mb-lg-0">
      <div
        style={{ height: "414px" }}
        className="d-flex flex-column align-items-center justify-content-center bg-secondary rounded-3"
      >
        <img src="/Cooking.gif" alt="" className="img-fluid" />
        <div className="text-center text-white mb-4">
          <h4>The module content is not uploaded yet!</h4>
          <p>
            Pro Tips: You can do some practice until the new module is released.
          </p>
        </div>
      </div>
    </Col>
  );
};

export default ContentCookingView;
