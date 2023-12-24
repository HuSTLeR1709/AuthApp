const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next)=>{
    try {
        const token = req.body.token; 
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token not found",
            })
        }

        try{

            const payload = jwt.verify(token , process.env.JWT_SECRET);
            req.user = payload;

        } catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })

        }

        next();
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Error in verifying token",
        })
        
    }
}

exports.isStudent = (req,res,next)=>{
    try {

        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students only"
            })
        }
        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role not matching",
        })
        
    }
}

exports.isAdmin = (req,res,next)=>{
    try {

        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admins only"
            })
        }

        next();
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"user role not matching",
        })
        
    }
}