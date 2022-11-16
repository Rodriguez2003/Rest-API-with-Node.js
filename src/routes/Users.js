const express = require("express");
const Router = express.Router();
const {
  getUsers,
  getUserById,
  userCreate,
  userUpdate,
  userDelete,
} = require("../controllers/usuarios");

Router.get("/", getUsers);
Router.get("/:id", getUserById);
Router.post("/", userCreate);
Router.put("/:id", userUpdate);
Router.delete("/:id", userDelete);

module.exports = Router;
