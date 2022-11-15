require("dotenv").config();

const nano = require("nano")(
  `http://${process.env.USER}:${process.env.PASSWORD}@localhost:5984`
);

module.exports = nano;
