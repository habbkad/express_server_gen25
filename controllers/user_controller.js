const User = require("../schemas/user_schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//request   POST
//Access    false
//desc      createUser
//Route       /

exports.createUser = async (req, res) => {
  let { name, email, password, user } = req.body;
  try {
    // encrypt password (hass)
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    const newUser = await new User({ name, email, password: hash, user });
    newUser.save();

    jwt.sign({ user: newUser }, "I like banku", (err, token) => {
      return res
        .cookies({
          token,
        })
        .send({ message: "User created successfully", token });
    });
  } catch (error) {
    res.send({ message: "create failed", error: error.message });
  }
};

//request   get
//Access    false
//desc      login
//Route       /

exports.signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (!userEmail) {
      return res.send({ error: "credentail incorrect" });
    }

    //check hashed password
    let pass = bcrypt.compareSync(password, userEmail.password); // true
    if (!pass) {
      return res.send({ error: "credentail incorrect" });
    }

    //jwt sign in
    jwt.sign({ user: userEmail }, "I like banku", (err, token) => {
      return res
        .cookie("token", token)
        .send({ message: "login sucessfull", token });
    });
  } catch (error) {
    res.send({ message: "sigin unsuccessful", error: error.message });
  }
};

//request   get
//Access    false
//desc      logout
//Route       /

exports.signOutUser = async (req, res) => {
  try {
    jwt.sign({ user: "" }, "I like banku", (err, token) => {
      return res
        .status(200)
        .cookie("token", "")
        .send({ message: "signed out" });
    });
  } catch (error) {
    return res
      .status(404)
      .send({ message: "error occured", error: error.message });
  }
};
