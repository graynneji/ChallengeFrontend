import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  sector: "",
  agree: false,
  processing: false,
  data: null,
  error: false,
  message: "",
  isSaved: false,
};

const postUsersSelections = createSlice({
  name: "post/user/selections",
  initialState,
  reducers: {
    postUserInProgress: (state, { payload }) => {
      state.processing = payload;
    },
    postUserInSuccess: (state, { payload }) => {
      state.fullName = payload.data.fullName;
      state.sector = payload.data.sector;
      state.agree = payload.data.agree;
      state.message = payload.data.message;
      state.isSaved = true;
      state.error = false;
    },
    postUserInFailed: (state, { payload }) => {
      state.isSaved = false;
      state.status = 400;
      state.error = true;
      state.message = payload.message;
    },
  },
});

export const { postUserInProgress, postUserInSuccess, postUserInFailed } =
  postUsersSelections.actions;

export default postUsersSelections.reducer;
