const { response, request } = require('express')

const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async(req = request, res = response) => {
    // Obtener los argumentos desde el url
    // const { q, nombre = 'no name', apikey, page = 1, limit } = req.query
    const { limite = 5, desde = 0 } = req.query
    const query = { estado : true };

    // // Obtener todos los usuarios con get
    // const usuarios = await Usuario.find()
    // .skip( desde )
    // .limit( Number(limite) )

    // const total = await Usuario.countDocuments()

    // Para resolver las dos peticiones al mismo tiempo. Reemplazo del codigo de arriba
    const [ total, usuarios  ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip( desde )
            .limit( Number(limite) )

    ])

    res.json({
        total,
        usuarios
    })}

const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt  )


    // Guardar en la bd
    await usuario.save();

    res.json({
        usuario,
    })

}

const usuariosPut = async(req, res = response) => {

    // Tomar el :id que colocamos en la ruta
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra BD
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json(usuario)
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg : 'Patch API - controlador',
})}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndRemove( id );

    // Forma recomendada
    const usuario = await Usuario.findByIdAndUpdate( id, {estado : false  } );

    res.json({ usuario })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}
