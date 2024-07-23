const jwt = require("jsonwebtoken");

require("dotenv").config();

function generateJWT(id,password,name) {
    // jwt payload
    data = {
        id:id,
        password:password,
        name:name
    };
    return jwt.sign({ data }, process.env.SECRET_KEY, { expiresIn: "1d" });
}