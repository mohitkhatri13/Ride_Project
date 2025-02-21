const { validationResult } = require('express-validator');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');

module.exports.registerCaptain = async(req , res , next)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})    
}
const{fullname , email , password , vehicle} = req.body;
const hashPassword = await captainModel.hashPassword(password);
const iscaptainalreadyexit =await captainModel.findOne({email});
// console.log(email);

if(iscaptainalreadyexit){
    return res.status(400).json({message:"Captain already exist"})
}



const captain =await captainService.createCaptain({
 firstname:fullname.firstname,
 lastname:fullname.lastname,
 email,
 password:hashPassword,
color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicleType:vehicle.vehicleType

})
const token = captain.generateAuthToken();
res.status(201).json({token , captain});


}