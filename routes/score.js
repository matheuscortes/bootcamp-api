const express = require("express"); 
const router = express.Router(); 

router.get("/", function(req, res) {
    res.send({nome: "Matheus", age: "19"})
}); 

router.post("/", function(req, res) {
    console.log(req.body); 

    res.send("POST Score"); 
});

router.put("/:id", function(req, res) {
    console.log(req.body); 
    console.log(req.params); 

    res.send("PUT Score")
}); 

router.delete("/", function(req, res) {
    console.log(req.body); 

    res.send("DELETE Score");
}); 

module.exports = router;