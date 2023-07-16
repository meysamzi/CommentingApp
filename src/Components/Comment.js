import { myself } from "../Assets/Images/imageExports";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
  updateComment,
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
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
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
          />
        )}
        <div className="commentsCardsRightSideEditReplyDelete">
          <span
            className="comment-action"
            onClick={() =>
              setActiveComment({ id: comment.id, type: "editing" })
            }
          >
            Edit
          </span>
          {comment.parentId === null && (
            <span
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </span>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, comment.id)}
          />
        )}
        {replies?.length > 0 && (
          <div className="commentsCardsRightSideReplies">
            {replies?.map((reply) => (
              <Comment
                comment={reply}
                addComment={addComment}
                updateComment={updateComment}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
