const { Sequelize } = require("sequelize");

const db = new Sequelize("example", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
