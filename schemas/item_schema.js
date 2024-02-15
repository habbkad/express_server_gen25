const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  item_name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sizes: [{ size: Number, country: String }],
  item_ttype: {
    type: String,
  },
});

const item_model = mongoose.model("shoes", itemSchema);

module.exports = item_model;
