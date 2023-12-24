const bcrypt = require("bcrypt"); 
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async (req, res)=>{
    try {
        const {name , email, password, role} = req.body;

        const existinguser = await User.findOne({email});

        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            });
        }

        let hashedpassword;
        try{
            hashedpassword =await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"Error in password hashing",
            })

        }

        const user = await User.create({
            name, email, password:hashedpassword, role
        });

        res.status(200).json({
            success:true,
            message:"User registered successfully",
        })

        
    } catch (error) {

        console.log(error);
        return res.status(400).json({
            success:false,
            message:"user can not be registered",
        })
        
    }

}

exports.login = async (req,res)=>{
    try {
        const {email, password} =req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please enter all details"

            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(403).json({
                success:false,
                message:"Please sign up First",
            })
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role,

        }

        if(await bcrypt.compare(password, user.password)){
            let token= jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            // user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options={
                expires:new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                htttpOnly: true,
            }

            res.cookie("token",token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Successfully logged in"
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in logging in"
        })
        
    }
}