const bcrypt = require("bcrypt"); 
const User = require('../models/User')


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