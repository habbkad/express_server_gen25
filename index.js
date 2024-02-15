const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./api");

const app = express();

connectDB();

const PORT = 5006;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
