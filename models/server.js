const express = require("express");
const cors = require('cors')

const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth :          '/api/auth',
            buscar :        '/api/buscar',
            categorias :    '/api/categorias',
            productos :     '/api/productos',
            usuarios :      '/api/usuarios',
        }
        // this.usuariosPath = '/api/usuarios'
        // this.productoPath = '/api/producto'

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

        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos, require('../routes/productos') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;