const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//
//our db
let Db = [];

//class to mutate our database
class User {
  //constructor to pass variable from class instance
  constructor(name, age, gen) {
    this.name = name;
    this.gen = gen;
    this.age = age;
  }

  //create user method
  addUser() {
    Db = [...Db, { name: this.name, age: this.age, gen: this.gen }];
    return Db;
  }

  //get all users
  static getUsers() {
    return Db;
  }
  static updateUser(student) {
    const newDb = Db.map((item) => {
      if (item.name == student.name) {
        return student;
      }
      return item;
    });
    Db = newDb;
    return Db;
  }

  //delet user
  static deleteUser(name) {
    const newDb = Db.filter((item) => item.name != name);
    Db = newDb;
    return Db;
  }
}
//

//middlewares
app.use(bodyParser.json());

//toutes and handlers
//adduser route
app.post("/add-user", (req, res) => {
  //recieve data from front end in req.body

  const { name, age, gen } = req.body;

  //creating instance of user
  const student = new User(name, age, gen);
  // adding new user
  student.addUser();

  res.send({ message: "user created successfully", data: Db });
});

//get all users
app.get("/all-students", (req, res) => {
  const students = User.getUsers();
  res.send({
    message: "all students",
    students,
  });
});

//update user
app.put("/update-students", (req, res) => {
  const student = req.body;
  const updateData = User.updateUser(student);
  res.send({
    message: "update successfull",
    updated_data: updateData,
  });
});

//delete
app.delete("/delete-student", (req, res) => {
  const { name } = req.body;
  const newData = User.deleteUser(name);
  res.send({
    message: "student deleted",
    newData,
  });
});

const PORT = 4004;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
