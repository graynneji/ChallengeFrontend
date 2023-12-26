import { configureStore } from "@reduxjs/toolkit";
import registerUser from "app/reducers/registeruser";
import actions from "app/reducers/actions";
import loginUser from "app/reducers/loginUser";

export const store = configureStore({
  reducer: {
    registeruser: registerUser,
    loginUser: loginUser,
    actions: actions,
  },
});
