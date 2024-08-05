const express = require("express");
const router = express.Router();
const controllers = require("../controllers/Controllers")
const middlewares = require("../middlewares/Middlewares")

router.get("/",(req,res)=>{
    if (req.user) {
         return res.redirect("/home");
    }
    res.render("login.ejs");
});

router.get("/signup",(req,res)=>{
    res.render("signup.ejs",{exists:false});
});

router.post("/login",(req,res)=>{
    controllers.login(req,res);
});

router.post("/newUser",(req,res)=>{
    controllers.newUser(req,res);
});

router.get("/home",(req,res)=>{
    controllers.dashboard(req,res);
});

router.post("/create",(req,res)=>{
    controllers.createChat(req,res);
});

router.post("/join",(req,res)=>{
    controllers.joinChat(req,res);
});

router.get("/chat/:chatID",(req,res)=>{
    controllers.chat(req,res);
});

router.get("/hello",(req,res)=>{
    res.send(`HI  ${req.abc}`)
});

module.exports = router
