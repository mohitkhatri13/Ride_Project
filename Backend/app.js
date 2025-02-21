const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const userRoutes = require("./Routes/user.routes")





const connectToDb = require("./db/db")
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:true}))
connectToDb();


app.use('/users' , userRoutes)

app.get("/" , (req , res)=>{
    res.send('hello brothers');
})
module.exports = app;