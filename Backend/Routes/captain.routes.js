const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const captainController = require('../Controllers/captain.controller');  
const authMiddleware = require('../Middlewares/auth.middlewares');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be 3 characters long'),     
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Vehicle type must be car, motorcycle or auto')
],
captainController.registerCaptain)

router.post('/login' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long')
], 
captainController.loginCaptain)

router.get('/profile' , authMiddleware.authCaptain, captainController.captainProfile)

router.get('/logout', authMiddleware.authCaptain , captainController.captainlogout);

module.exports = router;