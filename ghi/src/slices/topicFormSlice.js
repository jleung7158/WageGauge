import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const topicFormSlice = createSlice({
  name: "topicForm",
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleIsOpen } = topicFormSlice.actions;

export default topicFormSlice.reducer;
