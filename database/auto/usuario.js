const Sequelize = require('sequelize');
const bcrypt = require('bcrypt'); 
const { salts } = require('../../config/security.json')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(300),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ],
    hooks: {
      beforeValidate: (user) => {
        if(user.senha) {
          user.senha = bcrypt.hashSync(user.senha, salts)
        }
      }
    },
    defaultScope: {
      attributes: {
        exclude: ["senha"]
      }
    },
    scopes: {
      login: {
        attributes: ["id", "senha"]
      }
    }
  });
};
