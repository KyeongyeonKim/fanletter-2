import letters from "redux/modules/letterSlice";
import member from "redux/modules/memberSlice";
import auth from "redux/modules/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  letters,
  member,
  auth,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
