const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/Users");
const Couch = require("./routes/routes");
const SQL = require("./config/dbconnection");
const app = express();
const PORT = process.env.PORT || 3000;

//DBconnection
(async () => {
  try {
    await SQL.authenticate();
    await SQL.sync();
    console.log("Conexión Exitosa");
  } catch (error) {
    throw new Error(error);
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
  console.log(`http://localhost:${PORT}/`);
});
