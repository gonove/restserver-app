const { Router } = require('express');
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios.contoller');

const router = Router();

router.get("/", usuariosGet );

router.post("/", usuariosPost )

router.put("/:id", usuariosPut )

router.delete("/", usuariosDelete )

router.patch("/", usuariosPatch )

module.exports = router;