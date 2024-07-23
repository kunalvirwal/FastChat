const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")

router.get("/",(req,res)=>{
    res.render("login.ejs")
});

router.get("/signup",(req,res)=>{
    res.render("signup.ejs")
});

router.post("/newUser",(req,res)=>{
    controllers
});


module.exports = router
