const nano = require("../config/index");
const db = nano.use("prueba");

/**
 *  getItems
 */

//GET all
async function getItems(req, res) {
  const doclist = await db.list({ include_docs: true });
  res.send(doclist.rows);
}

//GET find by --
const findItems = async (req, res) => {
  try {
    const { apellido } = req.params;
    const data = await db.find({
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
    db.insert({ nombre, apellido, rol }).then((body) => {
      if (!nombre || !apellido || !rol) {
        return res.status(400).json({
          error: "Campos Vacíos",
        });
      } else {
        res.json(db);
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
