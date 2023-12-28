import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchSectorsStart,
  fetchSectorsSuccess,
  fetchSectorsFailure,
  fetchSelectionsStart,
  fetchSelectionsSuccess,
  fetchSelectionsFailure,
} from "app/reducers/sectors";
import axios from "axios";

const SECTORS_URL = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_SECTORS}`;
const POST_SELECTION_URL = `${process.env.REACT_APP_URL}${process.env.REACT_APP_URL_USER_SELECTION}`;

export const sectorsData = createAsyncThunk(
  "sectors",
  async (_, { dispatch }) => {
    dispatch(fetchSectorsStart(true));
    try {
      const response = await axios.get(SECTORS_URL);
      dispatch(fetchSectorsSuccess(response.data));
    } catch (error) {
      dispatch(fetchSectorsFailure(error.message));
    }

    //Fetch UserSelection Data

    dispatch(fetchSelectionsStart(true));
    try {
      const selectionsResponse = await axios.get(POST_SELECTION_URL);
      dispatch(fetchSelectionsSuccess(selectionsResponse.data));
    } catch (selectionsError) {
      dispatch(fetchSelectionsFailure(selectionsError.message));
    }
  }
);
