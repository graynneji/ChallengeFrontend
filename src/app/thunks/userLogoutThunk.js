import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLoginReset, userLoginInProgress } from "app/reducers/loginUser";
import axios from "axios";

const LOGOUT_URL = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_LOGOUT}`;

export const userLogout = createAsyncThunk(
  "logout",
  async ({ values, dispatch }) => {
    dispatch(userLoginInProgress(true));
    try {
      await axios.post(LOGOUT_URL, values);
      dispatch(userLoginReset());
      dispatch(userLoginInProgress(false));
    } catch ({ response }) {
      dispatch(userLoginReset());
      dispatch(userLoginInProgress(false));
    }
  }
);
