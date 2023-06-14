
const { Schema, model } = require('mongoose')

const CategoriaSchema = Schema({
    nombre : {
        type : String,
        required : [true, 'El nombre es obligatorio'],
        unique : true,
        ref : 'Usuario'
    },
    estado : {
        type : Boolean,
        default : true,
        required : true,
        ref : 'Usuario'
    },
    usuario : {
        type : Schema.Types.ObjectId,
        ref : 'Usuario',
        required : true,
    }

})


CategoriaSchema.methods.toJSON = function() {
    // Separamos los parametros que recibimos y con el operador spread dejamos 'los demas' en la constante usuario, luego retornamos usuario
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Categoria', CategoriaSchema )
