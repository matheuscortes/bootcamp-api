//Loads the Sequelize library
const { Sequelize, DataTypes } = require('sequelize'); 
//Sets the connection information
const options = require('../config/bd.json');

const _user = require('./auto/usuario'); 
const _record = require('./auto/nota'); 
const _checklist = require('./auto/checklist'); 

//Checks the connection
const connection = new Sequelize(options);
connection.authenticate().then(() => {
    console.log('Connected to database'); 
}).catch((error) => {
    console.log('Fail to connect to database: ' + error.message); 
});

const user = _user(connection, DataTypes); 
const record = _record(connection, DataTypes);
const checklist = _checklist(connection, DataTypes);

record.hasMany(checklist, {as:"checklists", foreignKey:"notaId"}); 
record.belongsTo(user, {as: "user", foreignKey:"usuarioId"}); 

module.exports = { connection, user, record, checklist }; 

