import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  postUserInProgress,
  postUserInSuccess,
  postUserInFailed,
} from "app/reducers/userSelections";
import axios from "axios";

const POST_SELECTION_URL = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_USER_SELECTION}`;

export const postSelection = createAsyncThunk(
  "post/user/selections",
  async ({ values, dispatch, getState }) => {
    dispatch(postUserInProgress(true));
    try {
      const { sectors, selections } = getState().sectorsSelection;
      console.log(sectors, selections);
      if (!selections) {
        const { data, status } = await axios.post(POST_SELECTION_URL, values);
        dispatch(postUserInSuccess({ data, status }));
        dispatch(postUserInProgress(false));
      } else {
        const { data, status } = await axios.patch(POST_SELECTION_URL, values);
        dispatch(postUserInSuccess({ data, status }));
        dispatch(postUserInProgress(false));
      }
    } catch ({ response }) {
      dispatch(postUserInFailed(response.data));
      dispatch(postUserInProgress(false));
    }
  }
);
