import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: [
    { title: "Writing stateful components", id: 1 },
    { title: "Using Redux", id: 2 },
  ],
};

export const articleSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addArticle: (state, action) => {
      const newArticle = action.payload;
      state.articles.push(newArticle);
    },
  },
});

export const { addArticle } = articleSlice.actions;

export default articleSlice.reducer;
