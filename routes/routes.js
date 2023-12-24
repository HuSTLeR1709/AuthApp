const express = require("express")

const router= express.Router();

const {login,signup} = require("../Controllers/auth");

const {auth, isStudent , isAdmin} = require("../middlewares/auth")


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

module.exports = router;

