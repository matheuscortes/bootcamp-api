const { Router } = require("express"); 
const router = Router(); 
const { create, get, destroy, update } = require("../mvc/controller/record"); 

router.get("/:id?", async(req, res) => {
    try {
        const { id } = req.params; 
        
        const record = await get(id); 

        if(!record) {
            return res.send("Record not found");
        }
    
        res.send(record);         
    } catch (error) {
        res.status(500).send({message: error.message});        
    }
}); 

router.post("/", async (req, res) => {
    try {
        const { body } = req; 
    
        const record = await create(body); 
    
        res.send(record);         
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