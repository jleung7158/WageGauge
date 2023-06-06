import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { pokemonApi } from "../services/pokemon";
import { api } from "../services/api";
import companySliceReducer from "../slices/companySlice";
import pokemonSliceReducer from "../slices/pokemonSlice";
import topicFormSliceReducer from "../slices/topicFormSlice";
import topicLikeSliceReducer from "../slices/topicLikeSlice";

export const store = configureStore({
  reducer: {
    companyFilter: companySliceReducer,
    pokemonFilter: pokemonSliceReducer,
    topicFormToggler: topicFormSliceReducer,
    likedFilter: topicLikeSliceReducer,
    [api.reducerPath]: api.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, pokemonApi.middleware),
});

setupListeners(store.dispatch);
