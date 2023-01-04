const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/Users");
const Couch = require("./routes/routes");
const SQL = require("./config/dbconnection");
const loggers = require("./Utils/logger");
const app = express();
const PORT = process.env.PORT || 3000;

//DBconnection
(async () => {
  try {
    await SQL.authenticate();
    await SQL.sync();
    loggers.mjson.info("Conexión Exitosa");
  } catch (error) {
    // throw new Error(error);
    loggers.simple.error(error);
  }
})();

//middelware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//routes MySQL
app.use("/usuarios", usuarios);

// routes CouchDB
app.use("/api", Couch);

// Server
app.listen(PORT, function () {
  loggers.mjson.info(`Server started and running on http://localhost:${PORT}/`);
});
