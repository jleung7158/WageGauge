import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company: "",
};

export const companySlice = createSlice({
  name: "company",
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

export const { setCompany, clearCompany } = companySlice.actions;

export default companySlice.reducer;
