import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  sectors: null,
  error: false,

  selections: [],
};

const loadSectors = createSlice({
  name: "sectors",
  initialState,
  reducers: {
    fetchSectorsStart: (state) => {
      state.loading = true;
    },

    fetchSectorsSuccess: (state, action) => {
      state.loading = false;
      state.sectors = action.payload[0].sectors.sectors;
      state.error = false;
    },
    fetchSectorsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    //selections
    fetchSelectionsStart: (state) => {
      state.loading = true;
    },
    fetchSelectionsSuccess: (state, action) => {
      state.loading = false;
      state.selections = action.payload.data[0];
      state.error = null;
    },
    fetchSelectionsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const {
  fetchSectorsStart,
  fetchSectorsSuccess,
  fetchSectorsFailure,
  fetchSelectionsStart,
  fetchSelectionsSuccess,
  fetchSelectionsFailure,
} = loadSectors.actions;
export default loadSectors.reducer;
