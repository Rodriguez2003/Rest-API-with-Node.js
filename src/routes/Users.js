const express = require("express");
const Router = express.Router();
const { getUsers } = require("../controllers/usuarios");

Router.get("/", getUsers);

module.exports = Router;
