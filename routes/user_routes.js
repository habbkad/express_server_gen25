const express = require("express");
const {
  createUser,
  signInUser,
  signOutUser,
} = require("../controllers/user_controller");
const Router = express.Router();

Router.route("/").post(createUser).get(signInUser);
Router.route("/logout").get(signOutUser);

module.exports = Router;
