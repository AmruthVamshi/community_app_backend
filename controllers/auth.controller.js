const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async(req,res)=>{
    try {
        const {houseNumber,password } = req.body;
        //validation
        let UserFound = await User.findOne({where:{houseNumber}});
		if(!UserFound) throw 'invalid username';
		let isvalidPassword = await bcrypt.compare(password,UserFound.password);
		if(!isvalidPassword) throw 'incorrect password';
		//signing in user
		const token = jwt.sign({
			id:UserFound.id,
            userName:UserFound.userName,
            houseNumber:UserFound.houseNumber
        },process.env.AUTH_KEY)
        //sending response
        res.status(200).json({
            message:"Successfully loggedin !",
            token
        })
    } catch (error) {
        res.status(203).json({
            message:"Some error occured!",
            error
        })
    }
}

exports.register = async(req,res)=>{
    try {
        const {userName, houseNumber, phoneNumber, password, retypePassword} = req.body;
        //validation
        if(userName.length<6) throw 'username should be greater than 6 characters!';
        if(password.length<6) throw 'password should be greater than 6 characters!';
        if(password!==retypePassword) throw 'passwords does not match!';
        if(houseNumber.length<5) throw 'invalid house number!';
        if(phoneNumber.length<10) throw 'invalid phone number!';
        let duplicateUser = await User.findOne({where:{houseNumber}});
        if(duplicateUser) throw 'account with this house number already exists';
        //encrypt password
        let salt = await bcrypt.genSalt(10);
		let encrypter_password = await bcrypt.hash(req.body.password,salt);
        //add to database
        let user = await User.create({
			userName,
            password:encrypter_password,
            houseNumber,
            phoneNumber
		})
        //send response
        res.status(200).json({
            message:`Account with house number ${user.houseNumber} is created succesfully!`,
            user
        })
    } catch (error) {
        res.status(203).json({
            message:"Some error occured!",
            error
        })
    }
}

exports.adminLogin = async(req,res)=>{
    try {
        const {username, password } = req.body;
        //validation
		if(username!=='Admin') throw 'invalid username';
		if(password!==process.env.ADMIN_PASSWORD) throw 'incorrect password';
		//signing in user
		const token = jwt.sign({
            userName:username,
            role:'Admin',
        },process.env.AUTH_KEY)
        //sending response
        res.status(200).json({
            message:"Successfully loggedin as admin!",
            token
        })
    } catch (error) {
        res.status(203).json({
            message:"Some error occured!",
            error
        })
    }
}