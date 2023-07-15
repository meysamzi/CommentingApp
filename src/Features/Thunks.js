export const getCommentsThunk = async () => {
  return fetch("data.json")
    .then((res) => res.json())
    .then((data) => data);
};
