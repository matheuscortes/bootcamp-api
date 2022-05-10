const express = require('express'); //Loads the Express library
const app = express(); //Starts the express application
const user = require('./routes/user'); //Loads the file so that it can be accessed 
const record = require('./routes/record'); 
const login = require('./routes/login'); 
const authorization = require('./middlewares/authorization'); 

app.use(express.json()); 

app.get("/", (req, res) => {
    const person = {name: 'Matheus', lastName: 'Cortes'};
    const { name, lastName } = person; 
    console.log(name, lastName); 
    res.send('Hello World'); 
});

app.get('/testing', (req, res) => {
    fetch("https://swapi.dev/api/people/1");
    res.send('testing'); 
}); 

app.use('/login', login); 
app.use(authorization);
app.use('/user', user); 
app.use('/record', record);

app.listen(3000, () => {
    console.log('Application running'); 
}); 