const { response } = require("express")



const validaArchivo = (req, res = response, next) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg : 'No files were uploaded. -> archivo'
         });
    }

    next()
}

module.exports = { validaArchivo }