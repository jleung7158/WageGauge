import { configureStore } from "@reduxjs/toolkit";
// import articlesReducer from "./articles/articleSlice";
import counterReducer from "./features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    // articles: articlesReducer,
    counter: counterReducer,
  },
});
