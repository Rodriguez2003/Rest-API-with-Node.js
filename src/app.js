const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/Users");
const Couch = require("./routes/routes");
const SQL = require("./config/dbconnection");
const logger = require("./helpers/Log");
const app = express();
const PORT = process.env.PORT || 3000;

//DBconnection
(async () => {
  try {
    await SQL.authenticate();
    await SQL.sync();
    logger.info("Conexión Exitosa");
  } catch (error) {
    // throw new Error(error);
    logger.error(error);
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
  logger.info(`server running: http://localhost:${PORT}/`);
});
