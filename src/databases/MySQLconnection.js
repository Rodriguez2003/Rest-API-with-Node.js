const SQL = require("../config/dbconnection");
const loggers = require("../Utils/logger");

const nano = require("../config/index");
const CouchDB = process.env.DB_DATABASE;
const db = nano.use(CouchDB);

//DBconnection
(async () => {
  try {
    await SQL.authenticate();
    await SQL.sync();
    loggers.mjson.info("Conexión Exitosa");
    db.insert({
      message: "La conexión se ha establecido con éxito",
    });
  } catch (error) {
    if (error) {
      // Handle the error
      loggers.simple.error(error);
      db.insert({
        message: "Unable to connect to the database",
        error,
      });
    }
  }
})();
