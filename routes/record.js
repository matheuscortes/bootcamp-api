const { Router } = require("express"); 
const router = Router(); 
const { check, validationResult } = require("express-validator"); 
const { create, get, destroy, update } = require("../mvc/controller/record"); 

router.get("/:id?", check("id").optional().isInt().withMessage("ID must be an Integer value"), async(req, res) => {
    try {
    
        const errors = validationResult(req); 

        if(!errors.isEmpty()) {
            return res.status(400).send({message: errors.array()}); 
        }
        
        const { id } = req.params; 
        const { userId } = req; 
        
        const record = await get(userId, id); 

        if(!record) {
            return res.send("Record not found");
        }
    
        res.send(record);         
    } catch (error) {
        res.status(500).send({message: error.message});        
    }
}); 

router.post("/", check('checklists').isArray().withMessage("Checklists must be an array"), async (req, res) => {
    try {

        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).send({message: errors}); 
        }

        const { body } = req;       
    
        const record = await create(body);  
    
        res.send(record, );         
    } catch (error) {
        res.status(500).send({message: error.message});         
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params; 
    const { heading, description, checklists} = req.body;  

    try {
        const record = await update(id, heading, description, checklists); 
        
        res.send(record); 
    } catch (error) {
        res.status(500).send({message: error.message});        
    }
}); 

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params; 
        
        const record = await destroy(id); 

        res.send("Record deleted successfully");        
    } catch (error) {
        res.status(500).send({message: error.message})        
    }
}); 

module.exports = router;