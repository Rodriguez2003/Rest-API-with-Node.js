const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/usuarios");
const db = require("./db/database");
const app = express();
const PORT = process.env.PORT || 3000;

//conexión DB
(async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Conexión Exitosa");
  } catch (error) {
    throw new Error(error);
  }
})();

//middelware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/usuarios", usuarios);

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
