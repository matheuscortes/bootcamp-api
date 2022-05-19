const { Router } = require('express'); 
const { body, validationResult } = require('express-validator'); 
const router = Router(); 
const { login } = require('../mvc/controller/user'); 

router.post('/', body('email').isEmail(), body('password').isLength({min: 5}).isEmpty(), async (req, res) => {
    try {
        const errors = validationResult(req); 
        
        if(!errors.isEmpty()) {
            return res.status(400).send({ message: errors.array()}); 
        }
        
        const { email, password } = req.body; 
        const token = await login(email, password); 

        if(token) {
            res.send({token});
        } else {
            res.status(401).send({message: 'Invalid credentials'})
        }
    } catch (error) {        
        res.status(500).send({message: error.message}); 
        throw error;           
    }
}); 

module.exports = router; 