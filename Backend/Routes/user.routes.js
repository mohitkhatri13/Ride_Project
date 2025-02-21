const express = require('express');
const router= express.Router();
const {body} = require("express-validator")
const userControler = require('../Controllers/user.controller')

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters long')
],
userControler.registeruser )



module.exports = router;