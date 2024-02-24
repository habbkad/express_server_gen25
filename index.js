const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const itemRouter = require("./routes/items_routes");
const connectDB = require("./api");

const app = express();

//mongoDB connect method
connectDB();

//middlewares
app.use(bodyParser.json());

//routes
//items route
app.use("/items", itemRouter);

const PORT = 5006;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
