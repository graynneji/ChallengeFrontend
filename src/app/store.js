import { configureStore } from "@reduxjs/toolkit";
import registerUser from "app/reducers/registeruser";
import actions from "app/reducers/actions";
import loginUser from "app/reducers/loginUser";
import loadSectors from "app/reducers/sectors";
import userSelections from "./reducers/userSelections";

export const store = configureStore({
  reducer: {
    registeruser: registerUser,
    loginUser: loginUser,
    sectorsSelections: loadSectors,
    actions: actions,
    userSelections: userSelections,
  },
});
