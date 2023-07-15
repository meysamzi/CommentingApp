import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
  "comments/getComments",
  async () => {}
);

const initialState = {
  isGetCommentsDataLoading: true,
  getCommentsData: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: {
    [getComments.pending]: (state) => {},
    [getComments.fulfilled]: (state, { payload }) => {},
    [getComments.rejected]: (state) => {},
  },
});

export default commentsSlice.reducer;
