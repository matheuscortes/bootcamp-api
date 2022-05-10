const { Router } = require('express'); 
const router = Router(); 
const { login } = require('../mvc/controller/user'); 

router.post('/', async (req, res) => {
    try {
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