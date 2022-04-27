const { DataTypes } = require("sequelize/types");

module.exports = (sequelize) => {
    const user = sequelize.define(
    'user',
     {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }, 
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false            
        }
     }, 
    {tableName: 'user', timestamps: false}
    ); 
}