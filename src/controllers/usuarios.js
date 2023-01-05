const Usuario = require("../models/Usuario");
const loggers = require("../Utils/logger");

//Couchconnection
const nano = require("../config/index");
const CouchDB = process.env.DB_DATABASE;
const db = nano.use(CouchDB);

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
  db.insert(usuario);
};

//Post
const userCreate = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const usuario = await Usuario.create({ nombre, email });
    if (!nombre || !email) {
      return res.status(400).json({
        error: "Campos Vacíos",
      });
    } else {
      loggers.mjson.info("Nuevo usuario creado" + usuario);
      res.json(usuario);
      db.insert(usuario);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    loggers.simple.error(err);
    db.insert(err);
  }
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
