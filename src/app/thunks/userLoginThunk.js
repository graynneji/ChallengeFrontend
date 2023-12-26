import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  userLoginSuccess,
  userLoginInProgress,
  userLoginFailed,
} from "app/reducers/loginUser";
import axios from "axios";

const LOGIN_URL = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_LOGIN}`;

export const userLogin = createAsyncThunk(
  "login",
  async ({ values, dispatch }) => {
    dispatch(userLoginInProgress(true));
    try {
      const { data, status } = await axios.post(LOGIN_URL, values);
      dispatch(userLoginSuccess({ data, status }));
      dispatch(userLoginInProgress(false));
    } catch ({ response }) {
      dispatch(userLoginFailed(response.data));
      dispatch(userLoginInProgress(false));
    }
  }
);
