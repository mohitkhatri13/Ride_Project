import { configureStore } from "@reduxjs/toolkit";
import captainReducer from "./Slice/captainslice";
import userReducer from "./Slice/userslice";
import socketReducer from "./Slice/socketSlice";
import locationReducer from "./Slice/locationSlice";

// Load location state from localStorage
const loadLocationState = () => {
  try {
    const serializedState = localStorage.getItem("locationState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("Could not load location state", err);
    return undefined;
  }
};

// Save location state to localStorage
const saveLocationState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("locationState", serializedState);
  } catch (err) {
    console.warn("Could not save location state", err);
  }
};

const store = configureStore({
  reducer: {
    captain: captainReducer,
    user: userReducer,
    socket: socketReducer,
    location: locationReducer,
  },
  preloadedState: {
    location: loadLocationState(),
  },
});

// Subscribe to store changes to persist location slice
store.subscribe(() => {
  const state = store.getState();
  saveLocationState(state.location);
});

export default store;
