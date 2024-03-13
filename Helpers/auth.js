const User = require("../schemas/user_schema");
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  let token = "";

  if (!req.cookies.token) {
    console.log(req.cookies.token);
    return res.send({ message: "Access route denied" });
  }
  token = req.cookies.token;

  console.log(token);
  let decoded = jwt.verify(token, "I like banku");

  if (!decoded) {
    return res.send({ message: "Access route denied" });
  }
  console.log(decoded.user);
  req.user = decoded.user;
  next();
};

exports.access = (...roles) => {
  return (req, res, next) => {
    if (req.user && req.user.user.includes(...roles)) {
      return next();
    }
    res.send({ message: "Access route denied." });
  };
};
