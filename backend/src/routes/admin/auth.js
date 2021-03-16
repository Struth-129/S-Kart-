const express = require("express");
const router = express.Router();
const User = require('../../models/user');
const { signup,signin,signout } = require('../../controllers/admin/auth');
const { validationSigninRequest, validationSignupRequest, isRequestValidated } = require("../../validators/auth");
const {requireSignin} = require('../../common-middleware/index');

router.post('/admin/signup',validationSignupRequest,isRequestValidated,signup);
router.post('/admin/signin',validationSigninRequest,isRequestValidated,signin);
router.post('/admin/signout',requireSignin,signout);
// router.post('/profile',requireSignin,(req,res)=>{
//     res.status(200).json({user: 'profile'});
// });



module.exports = router;