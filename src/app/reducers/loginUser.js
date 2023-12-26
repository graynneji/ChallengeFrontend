import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  data: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  },
  message: "",
  status: null,
  processing: false,
  error: false,
};

const loginUser = createSlice({
  name: "login",
  initialState,
  reducers: {
    userLoginSuccess: (state, { payload }) => {
      state.isLoggedIn = payload.data.isLoggedIn;
      state.data.id = payload.data.id;
      state.data.firstName = payload.data.firstName;
      state.data.lastName = payload.data.lastName;
      state.data.email = payload.data.email;
      state.status = payload.status;
    },
    userLoginInProgress: (state, { payload }) => {
      state.processing = payload;
    },
    userLoginFailed: (state, { payload }) => {
      state.isLoggedIn = payload.isLoggedIn;
      state.status = payload.status;
      state.error = true;
      state.message = payload.message;
    },
    userLoginReset: () => {
      return { ...initialState };
    },
  },
});

export const {
  userLoginFailed,
  userLoginInProgress,
  userLoginReset,
  userLoginSuccess,
} = loginUser.actions;

export default loginUser.reducer;
