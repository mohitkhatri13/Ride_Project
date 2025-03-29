import { configureStore } from "@reduxjs/toolkit";
import captainReducer from "./Slice/captainslice";
import userReducer from "./Slice/userslice";

const store = configureStore({
  reducer: {
    captain: captainReducer,
    user:userReducer
  },
});

export default store;
