const { DataTypes } = require("sequelize");
const MySQL = require("../config/dbconnection");

const Usuario = MySQL.define("Usuarios", {
  nombre: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Usuario;
