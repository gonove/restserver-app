require('dotenv').config()

const Server = require('./models/server')

// DOC
// https://documenter.getpostman.com/view/25389087/2s8ZDYWgrg

// Se crea una nueva instancia de la clase Server que tenemos en models
const server = new Server()

server.listen()