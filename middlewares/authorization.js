const jwt = require("jsonwebtoken"); 
const { check, validationResult } = require('express-validator');
const { secret } = require("../config/security.json"); 

module.exports = [
    check('authorization').not().isEmpty().withMessage('Token is mandatory')
    .isJWT().withMessage('Token must be in JWT format'), 
    (req, res, next) => {
    const { authorization } = req.headers; 

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).send({message: errors.array()}); 
    }

    if(!authorization) {
        return res.status(403).send({message: "Token not informed"}); 
    }

    try {
        const decoded = jwt.verify(authorization, secret); 
        req.userId = decoded.id; 
        
        next(); 
    } catch (error) {       
        return res.status(500).send({message: error.message});      
    }
}]