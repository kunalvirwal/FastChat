const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const middlewares = require("./middlewares/Middlewares")
const configs = require("./configs/Database")
const socketUtils = require("./socketUtils/SocketUtils")


const PORT = process.env.PORT || 5000;

app.set("view engine","ejs");
app.set("views", path.resolve("./src/views"));
configs.ConnectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'views','static')));

app.use("",middlewares.auth_user)
app.use("", require("./routes/Routes")); 

socketUtils.socketHandler(io)


http.listen(PORT,(error)=>{
    if (error) throw error;
})
