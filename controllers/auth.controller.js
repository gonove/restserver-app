const { response, request } = require("express");

const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generateJWT } = require("../helpers/generate-JWT");
const { googleVerify } = require("../helpers/google-verify");

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

// El orden de los parametros afecta??
const googleSingIn = async( req = request, res = response ) => {

    const {id_token } = req.body;

    try {
        const { nombre, img, correo } = await googleVerify( id_token )

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            // Crear el usuario
            const data = {
                nombre,
                correo,
                password : ':P',
                img,
                rol : 'USER_ROLE',
                google : true
            }

            usuario = new Usuario( data )
            // Se guarda en BD
            await usuario.save();
        }

        // Si el usuario en BD
        if ( !usuario.estado ) {
            res.status(401).json({
                msg : 'Hable con adm - Usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generateJWT( usuario.id )

        res.json({ usuario, id_token })

    } catch (error) {
        res.status(400).json({
            ok : false,
            msg : 'El token no se pudo verificar'
        })
    }

}


module.exports = { login, googleSingIn }