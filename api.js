const mongoose = require("mongoose");

//function to connect to mongoDB
const connectDB = async () => {
  try {
    //connect to mongoDB using mongoose
    await mongoose
      .connect(
        "mongodb+srv://codetrainfellows:CwOQo4sdwZWrLcHF@cluster0.all8bud.mongodb.net/"
      )
      .then((res) => {
        console.log(`mongoDB connected successfully`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
