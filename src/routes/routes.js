const express = require("express");
const Router = express.Router();
const { getItems, findItems, createItems } = require("../controllers/index");
const { getUsers } = require("../controllers/usuarios");

Router.get("/", getItems);
Router.post("/", createItems);
Router.get("/:apellido", findItems);

Router.get("/", getUsers);
module.exports = Router;
