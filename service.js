require('dotenv').config
const jwt = require('jsonwebtoken')

const JWT_STATUS = Object.freeze({
  INVALID_TOKEN: 'invalid_token',
  VALID_TOKEN: 'valid_token',
  BAD_TOKEN: 'bad_token',
})

function verifyJWTToken(token) {
  var decoded
  if (token == null) return JWT_STATUS.BAD_TOKEN

  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) return JWT_STATUS.INVALID_TOKEN

    return JWT_STATUS.BAD_TOKEN,""
  }

  return JWT_STATUS.VALID_TOKEN, decoded 
}

function decodeUserId(decoded){


  return "";
}

module.exports = { JWT_STATUS, verifyJWTToken, decodeUserId }
