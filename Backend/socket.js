const { Server } = require("socket.io");
const userModel = require("./models/user.model")
const captainModel = require("./models/captain.model")

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        socket.on('join', async (data) => {
            const { userId,captainId , userType } = data;
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(captainId, { socketId: socket.id });
            }
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });

        socket.on('update-location-captain' , async(data)=>{
            const { captainId, location } = data;

            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

             await captainModel.findByIdAndUpdate(captainId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            });
            

            console.log("updated location :", data);
            
        })
    });

    
};



const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(messageObject);
    
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }

module.exports = { initializeSocket, sendMessageToSocketId };
























