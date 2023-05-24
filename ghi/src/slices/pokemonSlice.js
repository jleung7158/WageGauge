import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

export const pokemonSlice = createSlice({
  name: "pokemonFilter",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.name = action.payload;
    },
    clearPokemon: (state) => {
      state.name = "";
    },
  },
});

export const { setPokemon, clearPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
