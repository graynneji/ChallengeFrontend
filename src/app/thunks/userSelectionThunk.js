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
  async (values, { dispatch, getState }) => {
    dispatch(postUserInProgress(true));
    try {
      const { selections } = getState()?.sectorsSelections;
      const { data } = getState()?.loginUser;

      const userId = data?.id;

      const valuesContainingUserId = {
        ...values.values,
        userId,
      };

      if (!userId) {
        throw new Error("you are not logged in");
      }

      if (!selections) {
        const responsePost = await axios.post(
          POST_SELECTION_URL,
          // valuesContainingUserId
          JSON.stringify(valuesContainingUserId),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        dispatch(postUserInSuccess(responsePost.data));
        dispatch(postUserInProgress(false));
      } else {
        const responsePatch = await axios.patch(
          `${POST_SELECTION_URL}/${userId}`,
          // values
          JSON.stringify(values.values),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // dispatch(postUserInSuccess({ data, status }));
        dispatch(postUserInSuccess(responsePatch.data));
        dispatch(postUserInProgress(false));
      }
    } catch ({ response }) {
      dispatch(postUserInFailed(response.data));
      dispatch(postUserInProgress(false));
    }
  }
);
