const express = require("express");

const app = express();
app.use(express.json());

// no routes yet — that's the point of RED

module.exports = app;
