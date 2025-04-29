// src/store/locationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickup: null,
  destination: null,
  pickupCoordinates: null,
  destinationCoordinates: null,
  userCoordinates: null,
  captainCoordinates: null,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setPickup: (state, action) => {
      state.pickup = action.payload;
      if (action.payload === null || action.payload === undefined) {
        console.log("Pickup deleted");
      } else {
        console.log("Pickup set to:", action.payload);
      }
    },
    setDestinations: (state, action) => {
      state.destination = action.payload;
      if (action.payload === null || action.payload === undefined) {
        console.log("Destination deleted");
      } else {
        console.log("Destination set to:", action.payload);
      }
    },
    setPickupCoordinates: (state, action) => {
      state.pickupCoordinates = action.payload;
      if (action.payload === null || action.payload === undefined) {
        console.log("Pickup Coordinates deleted");
      } else {
        console.log("Pickup Coordinates set to:", action.payload);
      }
    },
    setDestinationCoordinates: (state, action) => {
      state.destinationCoordinates = action.payload;
      if (action.payload === null || action.payload === undefined) {
        console.log("Destination Coordinates deleted");
      } else {
        console.log("Destination Coordinates set to:", action.payload);
      }
    },
    setUserCoordinates: (state, action) => {
      state.userCoordinates = action.payload;
      if (action.payload === null || action.payload === undefined) {
        console.log("User Coordinates deleted");
      } else {
        console.log("User Coordinates set to:", action.payload);
      }
    },
    setCaptainCoordinates: (state, action) => {
      state.captainCoordinates = action.payload;
      if (action.payload === null || action.payload === undefined) {
        console.log("Captain Coordinates deleted");
      } else {
        console.log("Captain Coordinates set to:", action.payload);
      }
    },
  },
});

export const {
  setPickup,
  setDestinations,
  setPickupCoordinates,
  setDestinationCoordinates,
  setUserCoordinates,
  setCaptainCoordinates,
} = locationSlice.actions;

export default locationSlice.reducer;
