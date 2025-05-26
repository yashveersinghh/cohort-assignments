const jwt = require('jsonwebtoken');
const {JWT_Secret} = require('../config');
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const word = token.split(" ");
    const jwtToken = word[1];
    const decodedValue = jwt.verify(jwtToken, JWT_Secret);
    try{
        if(decodedValue.username && decodedValue.username === "admin"){
            next();
        } else {
            res.status(403).json({
                msg: "You are not authorized",
            });
        }
    }catch (e){
        res.status(403).json({
            msg: "incorrect input",
        });
    }
}

module.exports = adminMiddleware;