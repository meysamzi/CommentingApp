import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../Features/Slice";

const Comments = () => {
    const { getCommentsData } = useSelector((store) => store.comments);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, []);
    console.log(getCommentsData);

  return <>a</>;
};

export default Comments;
