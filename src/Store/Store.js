import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "../Features/Slice";

const store = configureStore({
  reducer: {
    comments: commentsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
