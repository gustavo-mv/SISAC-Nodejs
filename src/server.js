const app = require("./app");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3333;

app.listen(PORT, () =>
  console.log(`O servidor está sendo executado em ${PORT}`)
);
