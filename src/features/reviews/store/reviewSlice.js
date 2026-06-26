import { createSlice } from "@reduxjs/toolkit";
import { createReviewThunk } from "./reviewThunks";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    submitting: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviewThunk.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })
      .addCase(createReviewThunk.fulfilled, (state) => {
        state.submitting = false;
      })
      .addCase(createReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
