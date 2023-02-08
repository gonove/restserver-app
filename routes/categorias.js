const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, actualizarCategoria, obtenerCategoriasID, obtenerCategoriasPopulate, borrarCategoria } = require("../controllers/categorias.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");
const { existeCategoria } = require("../helpers/db-validators");
const { hasRole } = require("../middlewares/validar-roles");

const router = Router();

// Obtener todas las categorias -> Publico ✅
router.get( '/', [
    validarCampos
], obtenerCategoriasPopulate )

// Obtener una categorias por ID -> Publico ✅
router.get( '/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    check('id', 'El ID no puede estar vacio.').notEmpty(),
    validarCampos
], obtenerCategoriasID )

// Crear categoria -> privado -> Cualquier persona con TOKEN ✅
router.post( '/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria )

// Actualizar registro por ID -> privado -> Cualquier persona con TOKEN ✅
router.put( '/:id', [
    validarJWT,
    check('id', 'No es un ID valido').isMongoId(),
    check('nombre', 'Se debe ingresar el nombre de la categoria a actualizar').notEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria )

// Borrar categoria -> ADMIN ✅
router.delete( '/:id', [
    validarJWT,
    hasRole('ADMIN_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria )



module.exports = router
