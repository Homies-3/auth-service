require("dotenv").config;
const jwt = require("jsonwebtoken");

function verifyJWTToken(token) {
  if (token == null) return false;
  jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("Invalid token");
      return false;
    }
  });

  return true;
}

module.exports = verifyJWTToken;
