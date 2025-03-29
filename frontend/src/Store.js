import { configureStore } from "@reduxjs/toolkit";
import captainReducer from "./Slice/captainslice";
import userReducer from "./Slice/userslice";
// import socketreducer from "./Slice/socketSlice";
import socketReducer from "./Slice/socketSlice";

const store = configureStore({
  reducer: {
    captain: captainReducer,
    user:userReducer,
    socket:socketReducer
    // socket: socketreducer,
  },
});

export default store;
