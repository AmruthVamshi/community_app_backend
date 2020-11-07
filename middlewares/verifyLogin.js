const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyAdmin = (req,res,next)=>{
    let token = req.header('admin-token');
    if(!token){
        res.status(401).json({
            message:'You are not authorized!'
        })
    }else{
        const admin = jwt.verify(token,process.env.AUTH_KEY);
        if(!admin){
            res.status(401).json({
                message:'You are not authorized!, invalid token!'
            })
        }else{
            req.admin = admin;
            next();
        }
    }
}

exports.verifyUser = (req,res,next)=>{
    let token = req.header('user-token');
    if(!token){
        res.status(401).json({
            message:'You are not authorized!'
        })
    }else{
        const user = jwt.verify(token,process.env.AUTH_KEY);
        if(!user){
            res.status(401).json({
                message:'You are not authorized!, invalid token!'
            })
        }else{
            req.user = user;
            next();
        }
    }
}