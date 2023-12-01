// Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faHeart,
  faFaceAngry,
  faFaceLaughSquint,
} from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "@/styles/CommunityPosts.module.css";
import { IReaction } from "@/types";
import { ENUM_POST_REACTIONS } from "@/enums/post";
import { ReactionUI } from "@/utils/reaction";

type IReactionPopoverProps = {
  reaction: IReaction | undefined;
  showReactionBox: boolean;
  setShowReactionBox: (state: boolean) => void;
  handlePostReaction: (reaction: ENUM_POST_REACTIONS) => void;
  handleRemovePostReaction: () => void;
};

const ReactionPopover = ({
  reaction,
  showReactionBox,
  setShowReactionBox,
  handlePostReaction,
  handleRemovePostReaction,
}: IReactionPopoverProps) => {
  const popoverReactionBox = (
    <Popover
      id="popover-basic"
      onMouseEnter={() => setShowReactionBox(true)}
      onMouseLeave={() => setShowReactionBox(false)}
    >
      <Popover.Body>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip className="text-uppercase" id="tooltip-top">
              {ENUM_POST_REACTIONS.LIKE}
            </Tooltip>
          }
        >
          <div
            onClick={() => handlePostReaction(ENUM_POST_REACTIONS.LIKE)}
            className="rounded-circle me-2"
          >
            <span>
              <FontAwesomeIcon icon={faThumbsUp} color="white" />{" "}
            </span>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip className="text-uppercase" id="tooltip-top">
              {ENUM_POST_REACTIONS.LOVE}
            </Tooltip>
          }
        >
          <div
            onClick={() => handlePostReaction(ENUM_POST_REACTIONS.LOVE)}
            className="rounded-circle me-2"
          >
            <span>
              <FontAwesomeIcon icon={faHeart} color="white" />{" "}
            </span>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip className="text-uppercase" id="tooltip-top">
              {ENUM_POST_REACTIONS.ANGRY}
            </Tooltip>
          }
        >
          <div
            onClick={() => handlePostReaction(ENUM_POST_REACTIONS.ANGRY)}
            className="rounded-circle me-2"
          >
            <span>
              <FontAwesomeIcon icon={faFaceAngry} color="white" />{" "}
            </span>
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip className="text-uppercase" id="tooltip-top">
              {ENUM_POST_REACTIONS.FUNNY}
            </Tooltip>
          }
        >
          <div
            onClick={() => handlePostReaction(ENUM_POST_REACTIONS.FUNNY)}
            className="rounded-circle"
          >
            <span>
              <FontAwesomeIcon icon={faFaceLaughSquint} color="white" />{" "}
            </span>
          </div>
        </OverlayTrigger>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      {!reaction ? (
        <OverlayTrigger
          show={showReactionBox}
          placement="top-start"
          overlay={popoverReactionBox}
        >
          <span
            className={styles.postFooterSpan}
            onClick={() => handlePostReaction(ENUM_POST_REACTIONS.LIKE)}
            onMouseEnter={() => setShowReactionBox(true)}
            onMouseLeave={() => setShowReactionBox(false)}
          >
            <FontAwesomeIcon icon={faThumbsUp} color="grey" />{" "}
            <p className="m-0 ms-2">Like</p>
          </span>
        </OverlayTrigger>
      ) : (
        <OverlayTrigger
          show={showReactionBox}
          placement="top-start"
          overlay={popoverReactionBox}
        >
          <span
            className={styles.postFooterSpan}
            onMouseEnter={() => setShowReactionBox(true)}
            onMouseLeave={() => setShowReactionBox(false)}
            onClick={handleRemovePostReaction}
          >
            {ReactionUI[reaction?.react]}
          </span>
        </OverlayTrigger>
      )}
    </>
  );
};

export default ReactionPopover;
