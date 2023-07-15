import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../Features/Slice";
import Comment from "./Comment";

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

  return (
    <div className="commentsCardsParent">
      {[0, 0, 0, 0, 0, 0, 0, 0].map(() => (
        <Comment />
      ))}
    </div>
  );
};

export default Comments;
