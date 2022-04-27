const express = require("express"); //Loads the Express library
const app = express(); //Starts the express application
const user = require("./routes/user"); //Accesses the folder 
const score = require("./routes/score"); 
const { connection } = require("./database");

app.use(express.json()); 

app.get("/", (req, res) => {
    const person = {name: "Matheus", lastName: "Cortes"};
    const { name, lastName } = person; 
    console.log(name, lastName); 
    res.send("Hello World"); 
});

app.get("/testing", (req, res) => {
    fetch('https://swapi.dev/api/people/1');
    console.log(person);
    res.send('testing'); 
}); 

app.use("/user", user); 
app.use("/score", score);

app.listen(3000, () => {
    console.log("Application running"); 
}); 