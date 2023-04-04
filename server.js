require("dotenv").config();
const express = require("express");
const app = express();

const verifyJWTToken = require("./service");

app.use(express.json());
app.post("/auth", (req, res) => {
  var isValid = false;
  if (req.headers && req.headers.authorization)
    isValid = verifyJWTToken(req.headers.authorization.split(" ")[1]);

  res.sendStatus(isValid ? 200 : 401);
});

app.listen(process.env.PORT);
