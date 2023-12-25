const express = require("express")

const router= express.Router();

const {login,signup} = require("../Controllers/auth");

const {auth, isStudent , isAdmin} = require("../middlewares/auth")

const User = require("../models/User");


router.post("/login", login);

router.post("/signup", signup);

router.get("/test", auth, (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected Test route"
    })
})

router.get("/students", auth, isStudent , (req, res)=>{
    res.json({
        suceess:true,
        message:"Welcome to protected route for students"
    })
})

router.get("/admin", auth , isAdmin , (req,res)=>{
    res.json({
        success:true,
        message:"Welcome to protected route for admin",

    })
})

router.get("/getData",auth, async (req,res)=>{
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        // console.log(user);
        res.status(200).json({
            success:true,
            user:user,
            message:"Found user Details"
        })
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"Error in findng details"
        })
        
    }
})

module.exports = router;

