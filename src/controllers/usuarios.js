const User = require("../models/Usuario");
const loggers = require("../Utils/logger");

// Couch connection
const nano = require("../config/index");
const CouchDB = process.env.DB_DATABASE;
const db = nano.use(CouchDB);

// GET all
function getUsers(req, res) {
  User.findAll()
    .then((users) => res.json(users))
    .catch((err) => handleError(err, res));
}

//GET find by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  const users = await User.findByPk(id);
  users ? res.json(users) : res.status(404).json({ error: "User not found" });
};

//Post
const userCreate = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const user = await User.create({ nombre, email });
    user
      ? (res.json(user),
        loggers.mjson.info("New user created"),
        db.insert({
          message: "New user created",
          user,
        }))
      : res.status(500).json({ error: "Error creating user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    loggers.simple.error(err);
    db.insert(err);
  }
};

//Update
const userUpdate = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  const { nombre, email } = req.body;
  user
    ? user.save({ nombre, email }).then((user) => res.json(user))
    : res.status(404).json({ error: "Not found" });
};

//Delete
const userDelete = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  user
    ? user.destroy().then(() => res.json(user))
    : res.status(404).json({ error: "Not found" });
};

module.exports = {
  getUsers,
  getUserById,
  userCreate,
  userUpdate,
  userDelete,
};
