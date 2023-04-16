require('dotenv').config({
  path: 'dev.env',
})
const { validate, register, login } = require('./controller')
var grpc = require('@grpc/grpc-js')
var protoLoader = require('@grpc/proto-loader')

const { MongoClient } = require('mongodb')
const client = new MongoClient(process.env.USER_DB_URL)
client
  .connect()
  .then(() => {
    console.log('Connected to DB')
  })
  .catch((error) => {
    console.log('Cannot connect to db: ',error)
    process.exit()
  })

var PROTO_PATH = 'auth.proto'
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
  validate: validate,
  register: register,
  login: login,
})

server.bindAsync(
  process.env.AUTH_SVC_URL,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    console.log('Server running at ' + process.env.AUTH_SVC_URL)
    server.start()
  },
)


