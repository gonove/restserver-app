const { Router } = require('express');
const { check } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validaArchivo } = require('../middlewares/validar-archivo');

const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/',validaArchivo, cargarArchivo )

router.put('/:coleccion/:id', [
    validaArchivo,
    check('id', 'no es un ID de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ]) ),
    validarCampos
], actualizarImagenCloudinary )

router.get('/:coleccion/:id', [
    check('id', 'no es un ID de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ]) ),
    validarCampos
], mostrarImagen )

module.exports = router