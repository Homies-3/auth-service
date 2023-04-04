require("dotenv").config();
const express = require("express");
const app = express();

const user = require("./models/user");
const verifyJWTToken = require("./services/authServices");

app.use(express.json());

app.post("/auth", (req, res) => {
  const isValid = verifyJWTToken(req.body.token);
  res.sendStatus(isValid ? 200 : 403);
});

app.listen(process.env.PORT);