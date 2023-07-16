import { myself } from "../Assets/Images/imageExports";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
}) => {
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div className="commentsCards">
      <div className="commentsCardsImgParent">
        <img src={myself} alt="logo" />
      </div>
      <div className="commentsCardsRightSide">
        <div className="commentsCardsRightSideNameAndDAte">
          <span>{comment?.username}</span>
          <span>{createdAt}</span>
        </div>
        <span>{comment.body}</span>
        {comment.parentId === null && (
          <span
            onClick={() =>
              setActiveComment({ id: comment.id, type: "replying" })
            }
          >
            Reply
          </span>
        )}
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, comment.id)}
          />
        )}
        {replies?.length > 0 && (
          <div className="commentsCardsRightSideReplies">
            {replies?.map((reply) => (
              <Comment comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
