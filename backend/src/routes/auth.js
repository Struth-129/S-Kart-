const express = require("express");
const router = express.Router();
const User = require('../models/user');
const { signup,signin } = require('../controllers/auth');
const { validationSigninRequest, validationSignupRequest, isRequestValidated } = require("../validators/auth");


router.post('/signup',validationSignupRequest,isRequestValidated,signup);
router.post('/signin',validationSigninRequest,isRequestValidated,signin);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({user: 'profile'});
// });



module.exports = router;