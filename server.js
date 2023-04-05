require('dotenv').config()
const express = require('express')
const app = express()

const { verifyJWTToken, JWT_STATUS } = require('./service')

app.use(express.json())

app.post('/auth', (req, res) => {
  var isValid = JWT_STATUS.INVALID_TOKEN

  if (req.headers && req.headers.authorization)
    isValid = verifyJWTToken(req.headers.authorization.split(' ')[1])

  res.sendStatus(isValid != JWT_STATUS.VALID_TOKEN ? 401 : 200)
})

app.listen(process.env.PORT)
