import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

// import articlesReducer from "./articles/articleSlice";
// import counterReducer from "../features/counter/counterSlice";

import { pokemonApi } from "../services/pokemon";
import { api } from "../services/api";
import companySliceReducer from "../slices/companySlice";
import pokemonSliceReducer from "../slices/pokemonSlice";

export const store = configureStore({
  reducer: {
    companyFilter: companySliceReducer,
    pokemonFilter: pokemonSliceReducer,
    // counter: counterReducer,
    [api.reducerPath]: api.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, pokemonApi.middleware),
});

setupListeners(store.dispatch);
