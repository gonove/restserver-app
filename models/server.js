const express = require("express");
const cors = require('cors')

const { dbConnection } = require('../database/config');
const fileUpload = require("express-fileupload");

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
            uploads :      '/api/uploads',
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

        // Fileuploads - carga de archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }

    // Se configuran las rutas de la app
    routes(){

        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/buscar') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos, require('../routes/productos') );
        this.app.use( this.paths.usuarios, require('../routes/usuarios') );
        this.app.use( this.paths.uploads, require('../routes/uploads') );

    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;