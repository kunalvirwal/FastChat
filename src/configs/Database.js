const mongoose = require("mongoose")
require("dotenv").config()

let dbConn

function ConnectDB(cb){
    mongoose.connect(process.env.MONGODB_URI)
        .then((reesult) => {
            console.log("Connected to DB")
        })
        .catch(err => {
            if (err){
                console.log("Unable to create connection to database\n\n")
                throw err
            }
        })
        
}

module.exports= {
    ConnectDB,
}

// // if using mysql
// const mysql = require("mysql2");
// require("dotenv").config();

// const dbConn = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

// dbConn.connect(function (err) {
//     if (err) throw err;
// });

// module.exports = dbConn;

// const { Client } = require("pg")

// client = new Client({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port:5432,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// })

// client.connect()