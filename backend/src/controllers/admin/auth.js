const User = require('../../models/user')
const jwt = require('jsonwebtoken');
const JWT_SECRET = "MERNSECRET";
const express = require("express");
const app = express();
const { validationResult } = require('express-validator');

app.use(express.json());
exports.signup = (req,res)=>{
    User.findOne({email:req.body.email})
    .exec((error,user)=>{
        if(user){
            return res.status(400).json({
                message:'Admin Already exist'
            })
        }
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const _user = new User(
            { firstName,
              lastName,
              email,
              password,
              role:'admin',
            username:Math.random().toString() 
        });
        _user.save((error, data)=>{
            if(error){
                return res.status(400).json({
                    message:'Someting went wrong'
                });
            }
            if(data){
                return res.status(201).json({
                    user:'Admin created successfully'
                })
            }
        })
    })
}

exports.signin = (req,res)=>{
    User.findOne({ email: req.body.email })
    .exec((error,user)=>{
        if(error){
            return res.status(400).json({
                error
            })
        }if(user){
            if(user.authenticate(req.body.password)&&user.role === 'admin'){

                const token = jwt.sign({_id: user._id,role: user.role},JWT_SECRET,{expiresIn: '1h'});
                const {_id,firstName,lastName,email,role,fullName} = user;
                res.status(200).json({
                    token,
                    user: {
                        _id,firstName, lastName ,email,role,fullName
                    }
                });
            }else{
                res.status(400).json({
                    message:"Invalid Password"
                })
            }
        }else{
            return res.status(400).json({
                message:"Something went wrong"
            })
        }
    })
}

// exports.requireSignin = (req,res,next)=>{
//     const token = req.headers.authorization.split(" ")[1];
//     const user  = jwt.verify(token,JWT_SECRET)
//     req.user = user;
//     // console.log(token);
//     next();
    
// }