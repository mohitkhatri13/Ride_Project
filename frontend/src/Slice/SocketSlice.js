import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socket; 

const initialState = {
  isConnected: false,
  messages: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setConnected, addMessage } = socketSlice.actions;

// Initialize the socket connection
export const initializeSocket = () => (dispatch) => {
//   console.log("Initializing socket...");
//   console.log("Trying to connect to:", import.meta.env.VITE_BASE_URL);

  if (!socket) {
    socket = io(`${import.meta.env.VITE_BASE_URL}`, {
      transports: ["websocket"], // Ensures persistent connection
      reconnection: true, // Enables automatic reconnection
      reconnectionAttempts: 5, // Try 5 times before failing
      reconnectionDelay: 2000, // Wait 2s before reconnecting
    });

    socket.on("connect", () => {
      console.log(" Connected to server");
      dispatch(setConnected(true));
    });

    socket.on("disconnect", () => {
      console.log(" Disconnected from server");
      dispatch(setConnected(false));
    });

    socket.on("message", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("connect_error", (error) => {
      console.error(" Connection error:", error.message);
    });
  }
};

// Send messages through socket
export const sendMessage = (eventName, message) => () => {
  if (socket) {
    console.log(` Sending (${eventName}):`, message);
    socket.emit(eventName, message);
  }
};

export const receiveMessage = (eventName, callback) => (dispatch) => {
  if (socket) {
    socket.on(eventName, (message) => {
      console.log(` Received (${eventName}):`, message);
      dispatch(addMessage({ event: eventName, message }));

      if (callback) {
        callback(message); // Pass the received message to the callback
      }
    });
  }
};


export default socketSlice.reducer;
