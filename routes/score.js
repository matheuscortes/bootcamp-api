const { Router } = require("express"); 
const router = Router(); 

router.get("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id);

    res.send("GET Score"); 
}); 

router.post("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id); 

    res.send("POST Score"); 
});

router.put("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id); 

    res.send("PUT Score"); 
}); 

router.delete("/:id", (req, res) => {
    const { id } = req.params; 
    console.log(id); 

    res.send("DELETE Score");
}); 

module.exports = router;