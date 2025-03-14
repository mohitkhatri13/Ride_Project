const userModel  = require('../models/user.model'); 
const BlacklistToken= require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');  
const jwt = require('jsonwebtoken');    
const captainModel = require('../models/captain.model');

module.exports.authUser= async(req , res , next)=>{ 

const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

if(!token){
    return res.status(401).json({message:"Unauthorized"})
}
const isBlacklisted = await BlacklistToken.findOne({token:token});

if(isBlacklisted){
    return res.status(401).json({message:"Unauthorized Access"})
}

try{
    const decoded = jwt.verify(token , process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    // we set the user data so that we can use it in return the user detail this can be done to increate security 
    // similarly we do for captains
    req.user = user;
   return next();

} catch(err){
    return res.status(401).json({message:"Unauthorized"})       
}
}
module.exports.authCaptain= async(req , res , next)=>{
const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

if(!token){
    return res.status(401).json({message:"Unauthorized"})}

const isBlacklisted = await BlacklistToken.findOne
({token:token});
if(isBlacklisted){
    return res.status(401).json({message:"Unauthorized Access"})}

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        req.captain = captain;
        return next();  
    }   catch(err){
        return res.status(401).json({message:"Unauthorized"})       
    }
}
