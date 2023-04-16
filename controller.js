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

let register = (registerMessage, callback) => {
    var phone = registerMessage.request.phone;
    var password = registerMessage.request.password;
    var company = registerMessage.request.company;

    // write the logic in service file

    callback(null,{
        "status":200,
        "error":"some error message"
    })
}

let login = (loginMessage, callback) => {
    var username = loginMessage.request.username;
    var password = loginMessage.request.password;

    //write the logic in service file

    callback(null, {
        "status":200,
        "error": "some error message",
        "token":"access_token"
    })
}

module.exports = {validate,register,login}


