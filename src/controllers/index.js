const nano = require("../config/index");
/**
 *  getItems
 */

const getItems = async (req, res) => {
  const alice = nano.use("prueba");
  const doclist = await alice.list({ include_docs: true });
  res.send(doclist.rows);
};

module.exports = {
  getItems,
};
