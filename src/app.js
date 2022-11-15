const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { getItems } = require("./controllers/index");


//middelware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/api", getItems);

//Server
app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}/`);
});
