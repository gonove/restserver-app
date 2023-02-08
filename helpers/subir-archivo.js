const path = require('path')
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensioesValidas = [ 'png', 'jpg', 'jpeg', 'gif' ], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split( '.' )
        const extension = nombreCortado[ nombreCortado.length - 1 ];


        // Validar la extension
        if ( !extensioesValidas.includes( extension )) {
            return reject( `La extension ${ extension} no es permitida. => ${extensioesValidas}` )
        }

        // Generar id unico
        const nombreTemporal = uuidv4() + '.' + extension

        //  Subida archivo y move
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemporal )

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(nombreTemporal);
        });
    } )
}

module.exports = { subirArchivo }