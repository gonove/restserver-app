

const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
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
        ref : 'Usuario'
    },
    precio : {
        type : Number,
        default : 0
    },
    categoria : {
        type : Schema.Types.ObjectId,
        ref : 'Categoria',
        required : true
    },
    descripcion : { type : String },
    disponible : { type : Boolean, default : true },
    img : { type :String }

})


ProductoSchema.methods.toJSON = function() {
    // Separamos los parametros que recibimos y con el operador spread dejamos 'los demas' en la constante usuario, luego retornamos usuario
    const { __v, estado, ...data } = this.toObject();
    return data;
}

module.exports = model( 'Producto', ProductoSchema )
