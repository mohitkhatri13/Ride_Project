const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult }= require('express-validator')

module.exports.registeruser = async(req , res , next)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
}

const {fullname , email , password} = req.body;

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