const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

const middlewares = require("./middlewares/Middlewares")
const configs = require("./configs/Database")


const PORT = process.env.PORT || 5000;

app.set("view engine","ejs");
app.set("views", path.resolve("./src/views"));
configs.ConnectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("",middlewares.authenticate_token)
app.use("",middlewares.auth_user)

app.use("", require("./routes/Routes")); 

app.listen(PORT,(error)=>{
    if (error) throw error;
})