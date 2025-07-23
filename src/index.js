const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, { 
    cors: {
        origin: "*"
      }
 });


const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const middlewares = require("./middlewares/Middlewares")
const configs = require("./configs/Database")
const socketUtils = require("./socketUtils/SocketUtils")


const PORT = process.env.PORT || 8000;

app.set("view engine","ejs");
app.set("views", path.resolve("./src/views"));
configs.ConnectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use("",middlewares.auth_user)
app.use("", require("./routes/Routes")); 

socketUtils.socketHandler(io)


server.listen(PORT,"0.0.0.0",(error)=>{
    if (error) throw error;
})
