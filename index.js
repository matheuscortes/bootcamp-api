const express = require("express"); //Loads the express library
const app = express(); //Starts the express application
const user = require("./routes/user"); //Accesses the folder 
const score = require("./routes/score"); 

app.use(express.json())

app.get("/", function (req, res) {
    res.send("Hello World"); 
});

app.use("/user", user); 
app.use("/score", score);

app.listen(3000, function() {
    console.log("Application running"); 
})