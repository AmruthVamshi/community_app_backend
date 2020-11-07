const { response } = require('express');
const {User} = require('../models');

exports.get = async(req,res)=>{
    try {
        let userDetails = await User.findOne({where:{id:req.user.id}});
        res.status(200).json({
            message:'your details',
            user:{
                id:userDetails.id,
                name:userDetails.userName,
                houseNumber:userDetails.houseNumber,
                phoneNumber:userDetails.phoneNumber
            }
        })
    } catch (error) {
        res.status(500).json({
            message:'Some error occured',
            error
        })
    }
}

exports.update = async(req,res)=>{
    try {
        let response = await User.update(req.body,{where:{id:req.user.id}});
        if(response){
            res.status(200).json({
                message:'succesfully updated'
            })
        }throw 'Could not update your profile'
    } catch (error) {
        res.status(500).json({
            message:'Some error occured',
            error
        })
    }
}