import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLiked: false,
};

export const topicLikeSlice = createSlice({
  name: "topicLike",
  initialState,
  reducers: {
    topicLiked: (state) => {
      state.isLiked = true;
    },
    topicUnliked: (state) => {
      state.isLiked = false;
    },
  },
});

export const { topicLiked, topicUnliked } = topicLikeSlice.actions;

export default topicLikeSlice.reducer;
