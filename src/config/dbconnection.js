const { Sequelize } = require("sequelize");

const MySQL = new Sequelize("example", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = MySQL;
