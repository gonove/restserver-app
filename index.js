require('dotenv').config()

const Server = require('./models/server')

// Se crea una nueva instancia de la clase Server que tenemos en models
const server = new Server()

server.listen()