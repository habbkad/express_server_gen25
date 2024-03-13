const mongoose = require("mongoose");
const Item = require("../schemas/item_schema");

//request   POST
//Access    Secured
//Route       /
exports.createNewItem = async (req, res) => {
  const { item_name, price, brand, quantity, sizes, item_type } = req.body;

  try {
    //create new data
    const newItem = await new Item({
      item_name,
      price,
      brand,
      quantity,
      sizes,
      item_type,
    });

    newItem.save();
    res.send({ message: "Item successfully created", data: newItem });
  } catch (error) {
    res.send({ message: "Data not creates", error: error.message });
  }
};

//request   getAll
//Access    open
//Route       /
exports.getAllItems = async (req, res) => {
  console.log(req.cookies);
  try {
    const items = await Item.find();
    res.send({ message: "Successfull", items });
  } catch (error) {
    res.send({ message: "unsuccessfull", error: error.message });
  }
};

//request   get one
//Access    open
//Route       /:id
exports.getSingleItems = async (req, res) => {
  const { id } = req.params;
  try {
    const singleItem = await Item.findById(id);
    res.send({ message: "update successful", item: singleItem });
  } catch (error) {
    res.send({ message: "error", error: error.message });
  }
};

//request   put
//Access    secured
//Route       /
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body);
    res.send({ message: "update successful", item: updatedItem });
  } catch (error) {
    res.send({ message: "error", error: error.message });
  }
};

//request   delete one
//Access    secured
//Route       /
exports.deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    res.send({ message: "delete successful", deletedItem });
  } catch (error) {
    res.send({ message: "delete unsuccessful", error: error.message });
  }
};
