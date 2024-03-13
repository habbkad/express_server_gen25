const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user_routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const itemRouter = require("./routes/items_routes");
const connectDB = require("./api");

const app = express();

//mongoDB connect method
connectDB();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser());

//routes
//items route
app.use("/items", itemRouter);
app.use("/user", userRoutes);

const PORT = 5006;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
