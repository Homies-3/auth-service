require("dotenv").config;
const jwt = require("jsonwebtoken");

function verifyJWTToken(token) {
  if (token == null) return false;
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token: ", err);
      return false;
    }
  });

  return true;
}

module.exports = verifyJWTToken;
