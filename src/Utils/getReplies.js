const getReplies = (commentId, backendComments) =>
  backendComments
    .filter((backendComment) => backendComment.parentId === commentId)
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

export default getReplies;
