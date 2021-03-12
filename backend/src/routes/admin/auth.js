const express = require("express");
const router = express.Router();
const User = require('../../models/user');
const { signup,signin } = require('../../controllers/admin/auth');
const { validationSigninRequest, validationSignupRequest, isRequestValidated } = require("../../validators/auth");


router.post('/admin/signup',validationSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validationSigninRequest,isRequestValidated,signin);

// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({user: 'profile'});
// });



module.exports = router;