export const getCommentsApi = async () => {
  fetch("data.json")
    .then((res) => res.json)
    .then((data) => data);
};
