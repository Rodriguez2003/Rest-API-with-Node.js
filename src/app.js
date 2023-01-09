const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/Users");
const Couch = require("./routes/routes");
const DBconnection = require("./databases/MySQLconnection");
const loggers = require("./Utils/logger");
const app = express();
const PORT = process.env.PORT || 3000;

//Couchconnection
const nano = require("./config/index");
const CouchDB = process.env.DB_DATABASE;
const db = nano.use(CouchDB);

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
  if (PORT) {
    loggers.info(`Server started and running on http://localhost:${PORT}/`);
    db.insert({
      message: `Server started and running on http://localhost:${PORT}/`,
    });
  } else {
    loggers.error("Error: No port specified");
    db.insert({
      message: "Error: No port specified",
    });
  }
});
