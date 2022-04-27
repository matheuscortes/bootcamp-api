//Loads the Sequelize library
const { Sequelize } = require('sequelize'); 

//Sets the connection information
const options = {
    username: 'admin',
    password: 'notes123',
    database: 'notes',
    host: 'notes.cgssmrnlwpdu.us-east-2.rds.amazonaws.com',
    dialect: 'mysql'
};

//Checks the connection
const connection = new Sequelize(options);
connection.authenticate().then(() => {
    console.log('Connected to database'); 
}).catch((error) => {
    console.log('Fail to connect to database: ' + error.message); 
});

module.exports = { connection }; 