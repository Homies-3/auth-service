require('dotenv').config({
  path: '/home/asishst/Desktop/Work/social/services/project/config/env/dev.env',
})
var PROTO_PATH = 'auth.proto'
const { verifyJWTToken, JWT_STATUS } = require('./service')
var grpc = require('@grpc/grpc-js')
var protoLoader = require('@grpc/proto-loader')

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
})

var protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

let server = new grpc.Server()


server.addService(protoDescriptor.AuthService.service, {
    validate: (validateMessage, callback) => {
    let token = validateMessage.request.token
    var isValid = verifyJWTToken(token)
    callback(null, {
      status: isValid != JWT_STATUS.VALID_TOKEN ? 401 : 200,
      error: isValid,
      userId: 'TODO',
    })
  },
})

server.bindAsync(
  process.env.AUTH_SVC_URL,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log('Server running at '+process.env.AUTH_SVC_URL)
    server.start()
  },
)

// const express = require('express')
// const app = express()

// const { verifyJWTToken, JWT_STATUS } = require('./service')
// console.log('Starting server')

// app.use(express.json())

// app.post('/auth', (req, res) => {
//   console.log('Checking validity')
//   var isValid = JWT_STATUS.INVALID_TOKEN

//   if (req.headers && req.headers.authorization)
//     isValid = verifyJWTToken(req.headers.authorization.split(' ')[1])

//   res.sendStatus(isValid != JWT_STATUS.VALID_TOKEN ? 401 : 200)
// })

// app.listen(process.env.PORT)
