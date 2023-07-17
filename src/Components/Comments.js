import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../Features/Slice";
import Comment from "./Comment";
import getReplies from "../Utils/getReplies";
import CommentForm from "./CommentForm";
import useIntersectionObserver from "../CustomHooks/useIntersectionObserver";

const Comments = () => {
  const { getCommentsData } = useSelector((store) => store.comments);
  const [backendComments, setBackendComments] = useState();
  const [activeComment, setActiveComment] = useState(null);
  const [dataCounter, setDataCounter] = useState(20);
  const intersectionObserverElement = useRef(null);
  let slicedData = useRef([]);
  let inView = useIntersectionObserver(intersectionObserverElement);
  slicedData.current = backendComments?.filter(
    (backendComment) => backendComment.parentId === null
  );
  slicedData.current =
    Array.isArray(slicedData.current) &&
    slicedData.current.slice(0, dataCounter);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, []);
  useEffect(() => {
    setBackendComments(getCommentsData);
  }, [getCommentsData]);
  useEffect(() => {
    inView && setDataCounter((prev) => prev + 5);
  }, [inView]);

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
        {Array.isArray(slicedData.current) &&
          slicedData?.current?.map((rootComment) => (
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
      <div
        ref={intersectionObserverElement}
        style={{ visibility: "hidden" }}
      ></div>
    </div>
  );
};

export default Comments;
