const nano = require("../config/index");
const CouchDB = process.env.DB_DATABASE;
const Couch = nano.use(CouchDB);

//GET all
async function getItems(req, res) {
  const doclist = await Couch.list({ include_docs: true });
  res.send(doclist.rows);
}

//GET find by --
const findItems = async (req, res) => {
  try {
    const { apellido } = req.params;
    const data = await Couch.find({
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
    Couch.insert({ nombre, apellido, rol }).then((body) => {
      if (!nombre || !apellido || !rol) {
        return res.status(400).json({
          error: "Campos vacíos",
        });
      } else {
        res.json(body);
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getItems,
  findItems,
  createItems,
};
