const jwt = require("jsonwebtoken");
const {JWT_Secret} = require('../config');

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const word = token.split(" ");
    const jwtToklen = word[1];
    const decodedValue = jwt.verify(jwtToklen, JWT_Secret);
    if(decodedValue.username){
        req.username = decodedValue.username;
        next();
    } else{
        res.status(403).json({
            msg: "You are not authorized"
        })
    }
}

module.exports = userMiddleware;