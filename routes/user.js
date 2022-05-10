const { Router } = require("express"); 
const { create, update, get, destroy } = require("../mvc/controller/user");
const router = Router();  //Enables to create separate routes

router.get("/:id?", async (req, res) => {    
    const { id } = req.params; 

    const user = await get(id);  

    res.send(user);
}); 

router.post("/", async (req, res) => {
    const {name, email, password} = req.body;     
    
    const user = await create(name, email, password); 

    res.send(user); 
});

router.put("/:id", async (req, res) => {
    const {name, password} = req.body; 
    const { id } = req.params; 

    const user = await update(id, name, password);  

    res.send(user); 
}); 

router.delete("/:id", async (req, res) => {
    const { id } = req.params; 
    
    const user = await destroy(id); 

    res.send("User deleted successfully");
}); 

module.exports = router; //Loads the router so that it can be used 