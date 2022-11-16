const Usuario = require("../models/Usuario");

const router = require("express").Router();

//GET all
router.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

//GET find by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      error: "Not found",
    });
  }
  res.json(usuario);
});

//Post
router.post("/", async (req, res) => {
  const { nombre, email } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({
      error: "Campos Vacíos",
    });
  }
  const usuario = await Usuario.create({ nombre, email });
  res.json(usuario);
});

//Update
router.put("/:id", async (req, res) => {
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
});

//Delete
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
