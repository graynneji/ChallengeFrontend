import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  userRegisterationSuccess,
  userRegisterationInProgress,
  userRegistrationFailed,
} from "app/reducers/registeruser";
import axios from "axios";

const REGISTRATION_URL = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_REGISTER}`;

export const userRegistration = createAsyncThunk(
  "register",
  async ({ values, dispatch }) => {
    dispatch(userRegisterationInProgress(true));
    try {
      const { data, status } = await axios.post(REGISTRATION_URL, values);
      dispatch(userRegisterationSuccess({ data, status }));
      dispatch(userRegisterationInProgress(false));
    } catch ({ response }) {
      dispatch(userRegistrationFailed(response.data));
      dispatch(userRegisterationInProgress(false));
    }
  }
);
