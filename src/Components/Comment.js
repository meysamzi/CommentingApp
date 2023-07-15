import { myself } from "../Assets/Images/imageExports";

const Comment = ({ comment, replies }) => {
  const createdAt = new Date(comment.createdAt).toLocaleDateString();

  return (
    <div className="commentsCards">
      <div className="commentsCardsImgParent">
        <img src={myself} alt="log" />
      </div>
      <div className="commentsCardsRightSide">
        <div className="commentsCardsRightSideNameAndDAte">
          <span>{comment?.username}</span>
          <span>{createdAt}</span>
        </div>
        <span>{comment?.body}</span>
      </div>
    </div>
  );
};

export default Comment;
