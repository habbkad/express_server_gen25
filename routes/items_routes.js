const express = require("express");
const {
  createNewItem,
  getAllItems,
  getSingleItems,
  deleteItem,
  updateItem,
} = require("../controllers/items_controllers");
const router = express.Router();

router.route("/").get(getAllItems).post(createNewItem);

router.route("/:id").put(updateItem).get(getSingleItems).delete(deleteItem);

module.exports = router;
