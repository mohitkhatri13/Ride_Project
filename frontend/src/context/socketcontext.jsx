
// import React, { createContext, useEffect } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext();

// const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

// const SocketProvider = ({ children }) => {
//     useEffect(() => {
//         // Basic connection logic
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from server');
//         });

//     }, []);
      
//       const sendMessage = (eventName , message)=>{
//          socket.emit(eventName, message);
//       }
//       const receiveMessage = (eventName , callback)=>{
//          socket.on(eventName, callback);
//       }



//     return (
//         <SocketContext.Provider value={{ socket , sendMessage , receiveMessage }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export default SocketProvider;
import React from 'react'

const socketcontext = () => {
  return (
    <div>
      
    </div>
  )
}

export default socketcontext
