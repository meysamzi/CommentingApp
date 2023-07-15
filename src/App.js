import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getComments } from "./Features/Slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComments());
  }, []);
  return <div>setting up project</div>;
}

export default App;
