const express = require("express");
const path = require("path")
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.set("view engine","ejs");
app.set("views", path.resolve("./src/views"));

app.use(express.json())

app.use("", require("./routes/Routes")); 

app.listen(PORT,(error)=>{
    if (error) throw error;
})