const jwt = require("jsonwebtoken"); 
const { secret } = require("../config/security.json"); 

module.exports = (req, res, next) => {
    const { authorization } = req.headers; 

    if(!authorization) {
        return res.status(403).send({message: "Token not informed"}); 
    }

    try {
        const decoded = jwt.verify(authorization, secret); 

        next(); 
    } catch (error) {
        return res.status(500).send({message: error.message});      
    }
}