import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  captain: null, // Stores captain details
};

const captainSlice = createSlice({
  name: "captain",
  initialState,
  reducers: {
    setCaptain: (state, action) => {
      state.captain = action.payload;
    },
    clearCaptain: (state) => {
      state.captain = null;
    },
  },
});

export const { setCaptain, clearCaptain } = captainSlice.actions;
export default captainSlice.reducer;
