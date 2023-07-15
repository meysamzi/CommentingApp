import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommentsApi } from "./Thunks";

export const getComments = createAsyncThunk(
  "comments/getComments",
  getCommentsApi
);

const initialState = {
  isGetCommentsDataLoading: true,
  getCommentsData: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isGetCommentsDataLoading = true;
    },
    [getComments.fulfilled]: (state, { payload }) => {
      console.log("payload ", payload);
      state.isGetCommentsDataLoading = false;
      state.getCommentsData = payload;
    },
    [getComments.rejected]: (state) => {
      state.isGetCommentsDataLoading = false;
      state.getCommentsData = [];
    },
  },
});

export default commentsSlice.reducer;
