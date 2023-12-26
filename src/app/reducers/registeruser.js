import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegistered: false,
  message: "",
  status: null,
  processing: false,
  error: false,
  data: null,
};

const registerUser = createSlice({
  name: "register",
  initialState,
  reducers: {
    userRegisterationSuccess: (state, { payload }) => {
      state.isRegistered = payload.data.isRegistered;
      state.message = payload.data.message;
      state.status = payload.status;
    },
    userRegisterationInProgress: (state, { payload }) => {
      state.processing = payload;
    },
    userRegistrationFailed: (state, { payload }) => {
      state.isRegistered = payload.isRegistered;
      state.error = true;
      state.status = 400;
      state.message = payload.message;
    },
    userRegistrationReset: () => {
      return { ...initialState };
    },
  },
});

export const {
  userRegisterationSuccess,
  userRegisterationInProgress,
  userRegistrationFailed,
  userRegistrationReset,
} = registerUser.actions;

export default registerUser.reducer;
