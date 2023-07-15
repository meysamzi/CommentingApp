import { configureStore } from "@reduxjs/toolkit";
import { commentsSlice } from "../Features/Slice";

const store = configureStore({
  reducer: {
    comments: commentsSlice,
  },
});

export default store;
