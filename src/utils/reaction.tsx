// Imports
import { ENUM_POST_REACTIONS } from "@/enums/post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faHeart,
  faFaceAngry,
  faFaceLaughSquint,
} from "@fortawesome/free-solid-svg-icons";

const LikeUI = () => {
  return (
    <>
      <FontAwesomeIcon icon={faThumbsUp} color="#006B5A" />
      <p className="m-0 ms-2 text-success">Like</p>
    </>
  );
};

const LoveUI = () => {
  return (
    <>
      <FontAwesomeIcon icon={faHeart} color="#DC3545" />{" "}
      <p className="m-0 ms-2" style={{ color: "#DC3545" }}>
        Love
      </p>
    </>
  );
};

const AngryUI = () => {
  return (
    <>
      <FontAwesomeIcon icon={faFaceAngry} color="#e97110" />{" "}
      <p className="m-0 ms-2" style={{ color: "#e97110" }}>
        Angry
      </p>
    </>
  );
};

const FunnyUI = () => {
  return (
    <>
      <FontAwesomeIcon icon={faFaceLaughSquint} color="#f8b125" />{" "}
      <p className="m-0 ms-2" style={{ color: "#f8b125" }}>
        Funny
      </p>
    </>
  );
};

export const ReactionUI = {
  [ENUM_POST_REACTIONS.LIKE]: <LikeUI />,
  [ENUM_POST_REACTIONS.LOVE]: <LoveUI />,
  [ENUM_POST_REACTIONS.ANGRY]: <AngryUI />,
  [ENUM_POST_REACTIONS.FUNNY]: <FunnyUI />,
};

export const PostReactionCountsSideIcons = () => {
  return (
    <>
      <div
        className="rounded-circle"
        style={{
          backgroundColor: "#006b5a",
          fontSize: "8px",
          padding: "2px 4px",
        }}
      >
        <span>
          <FontAwesomeIcon icon={faThumbsUp} color="white" />{" "}
        </span>
      </div>
      <div
        className="rounded-circle"
        style={{
          marginLeft: "-5px",
          backgroundColor: "#dc3545",
          fontSize: "8px",
          padding: "2px 4px",
        }}
      >
        <span>
          <FontAwesomeIcon icon={faHeart} color="white" />{" "}
        </span>
      </div>
      <div
        className="rounded-circle"
        style={{
          marginLeft: "-5px",
          backgroundColor: "rgb(233, 113, 15)",
          fontSize: "8px",
          padding: "2px 4px",
        }}
      >
        <span>
          <FontAwesomeIcon icon={faFaceAngry} color="white" />{" "}
        </span>
      </div>
      <div
        className="rounded-circle"
        style={{
          marginLeft: "-5px",
          backgroundColor: "rgb(247, 177, 37)",
          fontSize: "8px",
          padding: "2px 4px",
        }}
      >
        <span>
          <FontAwesomeIcon icon={faFaceLaughSquint} color="white" />{" "}
        </span>
      </div>
    </>
  );
};
