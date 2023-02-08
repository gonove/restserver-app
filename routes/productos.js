
const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto } = require("../controllers/productos.controller");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");


const router = Router();

router.get( '/',[
    validarCampos
], obtenerProductos )


router.get( '/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    check('id', 'El ID no puede estar vacio').notEmpty(),
    validarCampos
], obtenerProducto )


router.post( '/',[
    validarJWT,
    check('nombre', 'El nombre de producto es obligatorio').notEmpty(),
    check('categoria').custom( existeCategoria ),
    validarCampos
], crearProducto )


router.put( '/:id',[
    validarJWT,
    check('nombre', 'Se debe ingresar el nombre').notEmpty(),
    check('categoria', 'El ID es valido').isMongoId(),
    check('disponible', 'Debe ser un boolean').isBoolean(),
    check('id').custom( existeProducto ),
    check('categoria').custom( existeCategoria ),
    validarCampos
], actualizarProducto )


router.delete( '/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeProducto ),
    check('id', 'El ID no puede estar vacio').notEmpty(),
    validarCampos
], borrarProducto )


module.exports = router