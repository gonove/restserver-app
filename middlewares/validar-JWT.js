const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {

        res.status(401).json({
            msg : 'No hay token en la peticion'
        })
    }

    try {

        const { uid }  = jwt.verify( token, process.env.SECRETORPRIVATEKEY ) //Payload

        // Leer usuario que corresponde al uid
        const usuario = await Usuario.findById( uid )
        req.usuario = usuario

        if (!usuario) {
            return res.status(401).json({
                msg : 'Token no valido -usuario no existe en DB'
            })
        }

        // Se crea una propiedad nueva dentro del objeto request
        // req.uid = uid

        // Verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                msg : 'Token no valido -estatus en false'
            })
        }

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg : 'Token invalido 💔'
        })
    }



}



module.exports = { validarJWT }