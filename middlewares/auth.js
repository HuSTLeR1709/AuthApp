const jwt = require("jsonwebtoken");
require("dotenv").config();



//Testing route
exports.auth = (req,res,next)=>{
    try {
        //to get token through body(bad practice)
        // console.log("body" ,req.body.token);
        //to get token through cookie (good practice)
        // console.log("cookie",req.cookies.token);
        //to get token through header(best practice);
        // console.log("header",req.header("Authorization") )
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
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

//Authorization for a Student
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

//Authorization for a Admin
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