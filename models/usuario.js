

const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({

    nombre : {
        type: String,
        required : [ true, 'El nombre es obligatorio']
    },

    correo : {
        type : String,
        required : [true, 'El correo es obligatorio'],
        unique: true
    },

    password : {
        type : String,
        required : [true, 'La constraseña es obligatoria']
    },

    image : {
        type : String,
    },

    rol : {
        type : String,
        required : true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado : {
        type : Boolean,
        default : true
    },

    google : {
        type : Boolean,
        default : false
    },

});

UsuarioSchema.methods.toJSON = function() {
    // Separamos los parametros que recibimos y con el operador spread dejamos 'los demas' en la constante usuario, luego retornamos usuario
    const { __v, password, _id, ...usuario } = this.toObject();

    // Object.assign( usuario, { uid : usuario._id })
    // delete usuario._id;

    usuario.uid = _id

    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema  )
