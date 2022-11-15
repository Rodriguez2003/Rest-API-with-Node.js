const nano = require("../config/index");
/**
 *  getItems
 */

//GET all
const getItems = async (req, res) => {
  const alice = nano.use("prueba");
  const doclist = await alice.list({ include_docs: true });
  res.send(doclist.rows);
};

//GET find by --
const findItems = async (req, res) => {
  try {
    const { apellido } = req.params;
    const alice = nano.use("prueba");
    const data = await alice.find({
      selector: {
        apellido: apellido,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//POST
const createItems = async (req, res) => {
  try {
    const { nombre, apellido, rol } = req.body;
    const alice = nano.use("prueba");
    alice.insert({ nombre, apellido, rol }).then((body) => {
      if (!nombre || !apellido || !rol) {
        return res.status(400).json({
          error: "Campos Vacíos",
        });
      } else {
        res.json(alice);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getItems,
  createItems,
  findItems,
};
