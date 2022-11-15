const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { getItems, findItems, createItems } = require("./controllers/index");

//middelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/api", getItems);
app.post("/api", createItems);
app.get("/api/:apellido", findItems);

//Server
app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
