import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../Features/Slice";
import Comment from "./Comment";
import getReplies from "../Utils/getReplies";
import CommentForm from "./CommentForm";

const Comments = () => {
  const { getCommentsData } = useSelector((store) => store.comments);
  const [backendComments, setBackendComments] = useState();
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments?.filter(
    (backendComment) => backendComment.parentId === null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, []);
  useEffect(() => {
    setBackendComments(getCommentsData);
  }, [getCommentsData]);

  const updateComment = (text, commentId) => {
    const updatedBackendComments = backendComments.map((backendComment) => {
      if (backendComment.id === commentId) {
        return { ...backendComment, body: text };
      }
      return backendComment;
    });
    setBackendComments(updatedBackendComments);
    setActiveComment(null);
  };

  const addComment = (text, parentId = null) => {
    setBackendComments([
      ...backendComments,
      {
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId,
        userId: "1",
        username: "meysam",
        createdAt: new Date().toISOString(),
      },
    ]);
    setActiveComment(null);
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      const updatedBackendComments = backendComments.filter(
        (backendComment) => backendComment.id !== commentId
      );
      setBackendComments(updatedBackendComments);
    }
  };

  return (
    <div className="cardsLayoutParent">
      <CommentForm submitLabel="New Comment" handleSubmit={addComment} />
      <div className="commentsCardsParent">
        {rootComments?.map((rootComment) => (
          <Comment
            comment={rootComment}
            replies={getReplies(rootComment.id, backendComments)}
            setActiveComment={setActiveComment}
            activeComment={activeComment}
            addComment={addComment}
            updateComment={updateComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
