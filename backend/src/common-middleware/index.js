const jwt = require('jsonwebtoken');
const JWT_SECRET = "MERNSECRET";

exports.requireSignin = (req,res,next)=>{
    if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    const user  = jwt.verify(token,JWT_SECRET)
    req.user = user;
    // console.log(token);
    }else{
        return res.status(400).json( { message:'Authorization required' } )
    }
    next();    
}

exports.userMiddleware = (req,res,next) =>{
    if(req.user.role !== 'user'){
        return res.status(400).json({message: 'User Access Denied '})
    }
    next();
}
exports.adminMiddleware = (req,res,next) =>{
    if(req.user.role !== 'admin'){
        return res.status(400).json({message: 'Admin Access Denied '})
    }
    next();
}