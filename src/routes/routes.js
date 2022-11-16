const express = require("express");
const Router = express.Router();
const { getItems, findItems, createItems } = require("../controllers/index");

Router.get("/", getItems);
Router.post("/", createItems);
Router.get("/:apellido", findItems);

module.exports = Router;
