const { Router } = require("express"); 
const router = Router();  //Enables to create separate routes

router.get("/:id", (req, res) => {    
    const { id } = req.params; 
    console.log(id); 

    res.send("GET User");
}); 

router.post("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id);  

    res.send("POST User"); 
});

router.put("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id);  

    res.send("PUT User")
}); 

router.delete("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id);  

    res.send("DELETE User");
}); 

module.exports = router; //Loads the router so that it can be used 