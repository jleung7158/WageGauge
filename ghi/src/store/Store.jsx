import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// import articlesReducer from "./articles/articleSlice";
// import counterReducer from "../features/counter/counterSlice";

import { pokemonApi } from "../services/pokemon";
import { positionsApi } from "../services/positionsApi";
import { companiesApi } from "../services/companiesApi";
import filterSliceReducer from "../slices/filterSlice";

export const store = configureStore({
  reducer: {
    positionFilter: filterSliceReducer,
    // counter: counterReducer,
    [positionsApi.reducerPath]: positionsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      positionsApi.middleware,
      companiesApi.middleware
    ),
});

setupListeners(store.dispatch);
