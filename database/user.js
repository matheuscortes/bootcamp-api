const { DataTypes } = require("sequelize/types");

module.exports = (sequelize) => {
    const user = sequelize.define(
    'usuario',
     {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false            
        }
     }, 
    {tableName: 'usuario', timestamps: false}
    ); 

    return user; 
}