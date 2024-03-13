const express = require("express");
const { protect, access } = require("../Helpers/auth");
const {
  createNewItem,
  getAllItems,
  getSingleItems,
  deleteItem,
  updateItem,
} = require("../controllers/items_controllers");
const router = express.Router();

router
  .route("/")
  .get(getAllItems)
  .post(protect, access("admin"), createNewItem);

router
  .route("/:id")
  .put(protect, access("admin"), updateItem)
  .get(getSingleItems)
  .delete(protect, access("admin"), deleteItem);

module.exports = router;
