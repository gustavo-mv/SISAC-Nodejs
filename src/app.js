const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;
