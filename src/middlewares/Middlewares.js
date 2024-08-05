const jwt = require("jsonwebtoken");
require("dotenv").config()

function auth_user(req,res,next){
    if (req.user){
        res.clearCookie("token");
        return res.status(400);  // User not authenticated, Can't access route!
    }

    const cookies = req.cookies;
    if (cookies && cookies.token) {

        try {
            const payload = jwt.verify(cookies.token, process.env.SECRET_KEY);
            req.user = payload.data;

        } catch (err) {
            res.clearCookie("token");
            return res.status(403).redirect("/");  // Invalid JWT token
        }
    } else {
        req.user=undefined;  // No JWT token
    }
    const unprotectedPaths = ["/signup", "/newUser", "/login","/"]

    if (!req.user && !unprotectedPaths.includes(req.path)){  // no jwt and path is protected 
        return res.status(401).redirect("/");  
    } else{
        next()
    }

}




//sanitise a query
function sanitise(query) {
    wrong_characters = ["\'", "\"", "\`", "--", "=", " ", "(", ")", ",",];

    wrong_characters.forEach((val) => {
        if (query.includes(val)) {
            return false;
        }
    });

    return true;
}

//sql injection sanition
function sanitiseEmail(req, res, next) {
    req.body.email = req.body.email.trim().toLowerCase();
    parts = req.body.email.split("@")
    let valid = true;
    if (parts.length == 2) {
        valid = sanitise(parts[1]);
    }
    else {
        valid = false;
    }

    if (valid) {
        next();
    }
    else {
        res.status(400).redirect("/"); // Wrong input details, can't login
    }
}

module.exports={
    sanitiseEmail,
    auth_user,
}