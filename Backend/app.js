const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const userRoutes = require("./Routes/user.routes")
const captainRoutes = require("./Routes/captain.routes")
const mapRoutes = require("./Routes/mapRoutes")
const RideRoutes = require("./Routes/ride.routes");



const connectToDb = require("./db/db")
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))
connectToDb();


app.use('/users' , userRoutes)
app.use('/captains' , captainRoutes)
app.use('/maps' ,mapRoutes)
app.use("/rides" , RideRoutes)

app.get("/" , (req , res)=>{
    res.send('hello brothers');
})
module.exports = app;