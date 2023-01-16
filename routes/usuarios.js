const { Router } = require('express');
const { check } = require('express-validator');

const { isValidRole, existeEmail, existeUsuarioId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios.contoller');

const router = Router();

router.get("/", usuariosGet );

router.post("/", [
    check('nombre', 'El nombre es obligatorio').not(). isEmpty(),
    check('password', 'El password es obligatorio y debe ser tener mas de 6 digitos ').isLength({min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom( rol => isValidRole( rol )), LO MISMO QUE ABAJO
    check('rol').custom( isValidRole ),
    validarCampos
], usuariosPost )

router.put("/:id",[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    check('rol').custom( isValidRole ),
    validarCampos
], usuariosPut )

router.delete("/:id",[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioId ),
    validarCampos
], usuariosDelete )

router.patch("/", usuariosPatch )

module.exports = router;