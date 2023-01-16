const { validationResult } = require("express-validator");

// Nace de la necesidad de no copiar y pegar el codigo para validar cada uno de los endpoints de nuestra app
const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        res.status(400).json(errors)
    }

    next();
}

module.exports = {
    validarCampos
}
