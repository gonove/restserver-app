const express = require("express");
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        // Conectar a db
        this.connectDB();

        // Middlewares
        this.middlewares()

        // Routes
        this.routes()
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use( cors() )

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio  publico
        this.app.use( express.static('public') )
    }

    // Se configuran las rutas de la app
    routes(){

        this.app.use( this.usuariosPath, require('../routes/usuarios') );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;