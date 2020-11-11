const {User, Complaint, ComplaintCategory} = require('../models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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
        res.status(203).json({
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
        res.status(203).json({
            message:'Some error occured',
            error
        })
    }
}

exports.getComplaints = async(req,res)=>{
    try {
        const complaints = await Complaint.findAll({
            include:[
                {
                    model:ComplaintCategory,
                    as:'category'
                },
                {
                    model:User,
                    as:"linkedUser"
                }
            ],
            order: [["updatedAt", 'DESC']],
            where:{
                userId:req.user.id
            }
        });
        res.status(200).json({
            message:'my complaints',
            body:complaints.map(item=>{
                return {
                    id:item.id,
                    category:item.category.categoryName,
                    date:(()=>{
                        let date = new Date(item.updatedAt).toString();
                        return date.substring(0,date.length-31)
                    })(),
                    complaint:item.complaint,
                    status:item.status,
                    houseNumber:item.linkedUser.houseNumber,
                    phoneNumber:item.linkedUser.phoneNumber
                }
            })
        })
        
    } catch (error) {
        res.status(203).json({
            message:'Some error occured',
            error
        })
    }
}

exports.changePassword = async(req,res)=>{
    try {
        const {password, retypePassword} = req.body;
        //validation
        if(password.length<6) throw 'password should be greater than 6 characters!';
        if(password!=retypePassword) throw 'passwords does not match!';
        //encrypt password
        let salt = await bcrypt.genSalt(10);
		let encrypter_password = await bcrypt.hash(password,salt);
        //add to database
        let response = await User.update({password:encrypter_password},{where:{id:req.user.id}});
        if(response){
            res.status(200).json({
                message:'succesfully updated'
            })
        }throw 'Could not update your profile'

    } catch (error) {
        console.log(error)
        res.status(203).json({
            message:'Some error occured',
            error
        })
    }
}