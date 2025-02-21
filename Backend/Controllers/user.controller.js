const { compare } = require('bcrypt');
const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult }= require('express-validator')
const BlacklistToken = require('../models/blacklistToken.model')


module.exports.registeruser = async(req , res , next)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}

const {fullname , email , password} = req.body;
const ifuseralreadyexist = await userModel.findOne({email});
if(ifuseralreadyexist){ 
    return res.status(400).json({message:"User already exist"})
}

const hashPassword = await userModel.hashPassword(password);
 firstname = fullname.firstname
 lastname = fullname.lastname
 
const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password:hashPassword
})

const token = user.generateAuthToken();
res.status(201).json({token , user});

}

module.exports.loginUser = async(req , res , next)=>{

    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email , password} = req.body;

     const user = await userModel.findOne({email}).select('+password');

     if(!user){
        return res.status(401).json({message:"Invalid Email or Password"});
     }

     const isMatch = await user.comparePassword(password);

     if(!isMatch){
        return res.status(401).json({message:"Invalid Email or Password"});
     }
     
     const token = user.generateAuthToken();
     res.cookie('token' , token);

     res.status(200).json({token , user});  
}

module.exports.getUserProfile = async(req , res , next)=>{

    return res.status(200).json(
        req.user
    )
}  

module.exports.logoutUser = async(req , res , next)=>{
    const token = req.cookies.token || req.headers?.authorization?.split(' ')[1];
    res.clearCookie('token');
    

     await BlacklistToken.create({token});

    res.status(200).json({message:"Logout Successfully"})
    
}


