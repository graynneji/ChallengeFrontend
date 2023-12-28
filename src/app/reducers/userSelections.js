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
      state.agree = payload.agree;
    },
    postUserInFailed: (state, { payload }) => {
      state.isSaved = payload.isSaved;
      state.status = 400;
      state.message = payload.message;
    },
  },
});

export const { postUserInProgress, postUserInSuccess, postUserInFailed } =
  postUsersSelections.actions;

export default postUsersSelections.reducer;
