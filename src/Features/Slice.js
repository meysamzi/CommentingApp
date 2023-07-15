import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCommentsThunk } from "./Thunks";

export const getComments = createAsyncThunk(
  "comments/getComments",
  getCommentsThunk
);

const initialState = {
  isGetCommentsDataLoading: true,
  getCommentsData: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    [getComments.pending]: (state) => {
      state.isGetCommentsDataLoading = true;
    },
    [getComments.fulfilled]: (state, { payload }) => {
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
