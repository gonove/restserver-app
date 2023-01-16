const Role = require('../models/rol')
const Usuario = require('../models/usuario')

const isValidRole =  async(rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la BD`)
    }
}

const existeEmail = async( correo = '' ) => {
    const exists = await Usuario.findOne({ correo });

    if (exists) {
        throw new Error(`El correo: ${correo}, ya registrado en la BD </3`)
    }
}

const existeUsuarioId = async( id ) => {
    const existeUsuario = await Usuario.findById( id );

    if (!existeUsuario) {
        throw new Error(`El id: ${id}, no existe.`)
    }

}

module.exports = { isValidRole, existeEmail, existeUsuarioId }