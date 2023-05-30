import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokemonName: "",
};

export const pokemonSlice = createSlice({
  name: "pokemonFilter",
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.pokemonName = action.payload;
    },
    clearPokemon: (state) => {
      state.pokemonName = "";
    },
  },
});

export const { setPokemon, clearPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
