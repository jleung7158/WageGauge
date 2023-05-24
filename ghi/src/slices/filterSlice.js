import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: "",
};

export const filterSlice = createSlice({
  name: "positionFilter",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    clearCompany: (state) => {
      state.company = "";
    },
  },
});

export const { setCompany, clearCompany } = filterSlice.actions;

export default filterSlice.reducer;
