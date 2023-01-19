const { response } = require("express");

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require("../helpers/generate-JWT");

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo })
        if ( !usuario ) {
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos -correo'
            })
        }

        // Si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos -estado:false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password )
        if ( !validPassword ) {
            return res.status(400).json({
                msg : 'Usuario / Password no son correctos -password'
            })
        }

        // Generar el JWT
        const token = await generateJWT( usuario.id )


        res.json({
            usuario, token
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            mgs : 'Algo salio mal, hable con el ADM'
         })
    }

}


module.exports = { login }