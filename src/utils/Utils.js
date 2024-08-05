const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();

function generateJWT(name,email,id) {
    // jwt payload
    data = {
        name:name,
        email:email,
        uuid:id
    };
    return jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "1d" });
}

function saltNhash(password) {
    const salt = bcrypt.genSaltSync(10)
    password = bcrypt.hash(password, salt);
    return password
}

module.exports={
    generateJWT,
    saltNhash,
}