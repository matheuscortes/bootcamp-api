const express = require("express"); 
const router = express.Router(); //Enables to create separate routes

router.get("/", function(req, res) {
    res.send({nome: "Matheus", age: "19"})
}); 

router.post("/", function(req, res) {
    console.log(req.body); 

    res.send("POST User"); 
});

router.put("/", function(req, res) {
    console.log(req.body); 

    res.send("PUT User")
}); 

router.delete("/", function(req, res) {
    console.log(req.body); 

    res.send("DELETE User");
}); 

module.exports = router; //Loads the router so that it can be used 