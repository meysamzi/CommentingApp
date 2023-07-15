import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../Features/Slice";
import Comment from "./Comment";
import getReplies from "../Utils/getReplies";

const Comments = () => {
  const { getCommentsData } = useSelector((store) => store.comments);
  const [backendComments, setBackendComments] = useState();
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

  return (
    <div className="commentsCardsParent">
      {rootComments?.map((rootComment) => (
        <Comment replies={getReplies(rootComment.id, backendComments)} />
      ))}
    </div>
  );
};

export default Comments;
