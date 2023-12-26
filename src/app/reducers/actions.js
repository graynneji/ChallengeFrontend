import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  action: "",
};

const actionCenter = createSlice({
  name: "actions",
  initialState,
  reducers: {
    triggerModalOpen: (state, { payload }) => {
      state.isModalOpen = true;
      state.action = payload;
    },
    triggerModalClose: (state) => {
      state.isModalOpen = false;
      state.action = "";
    },
  },
});

export const { triggerModalClose, triggerModalOpen } = actionCenter.actions;

export default actionCenter.reducer;
