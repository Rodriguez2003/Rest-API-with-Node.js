const Usuario = require("../models/Usuario");
const logger = require("../helpers/logger");

//GET all
async function getUsers(req, res) {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
}

//GET find by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      error: "Not found",
    });
  }
  res.json(usuario);
};

//Post
const userCreate = async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    logger.error("Error", { operation: "INSERT" });
    return res.status(400).json({
      error: "Campos Vacíos",
    });
  }
  const usuario = await Usuario.create({ nombre, email });
  logger.info("Nuevo Usuario Agregado");
  res.json(usuario);
};

//Update
const userUpdate = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  const { nombre, email } = req.body;
  if (!usuario) {
    return res.status(404).json({
      error: "Not found",
    });
  } else {
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.save().then((usuario) => {
      res.json(usuario);
    });
  }
};

//Delete
const userDelete = async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      error: "Not found",
    });
  } else {
    usuario.destroy();
    res.json(usuario);
  }
};

module.exports = {
  getUsers,
  getUserById,
  userCreate,
  userUpdate,
  userDelete,
};
