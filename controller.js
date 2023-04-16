const { verifyJWTToken, JWT_STATUS, decodeUserId } = require('./service')

let validate = (validateMessage, callback) => {
    let token = validateMessage.request.token
    
    var {isValid,decoded} = verifyJWTToken(token)
    var userId = decodeUserId(decoded)

    callback(null, {
      status: isValid != JWT_STATUS.VALID_TOKEN ? 401 : 200,
      error: isValid,
      userId: userId,
    })
  }

let register = (registerMessage, callback) => {}

let login = (loginMessage, callback) => {}

module.exports = {validate,register,login}


