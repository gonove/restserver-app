const { response } = require("express");
const { Producto } = require("../models");


const obtenerProductos = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query
    const query = { estado : true }

    const [ total, productos ] =  await Promise.all([

        Producto.countDocuments( query ),
        Producto.find( query )
            .limit( Number(limite) )
            .skip( desde )
            .populate( 'usuario', 'nombre' )
    ])

    res.status(200).json({
        total, productos
    })
}

const obtenerProducto = async( req, res = response ) => {

    const { id } = req.params

    const producto = await Producto.findById( id )
        .populate('usuario', 'nombre')

    res.status(200).json({
        producto
    })
}

const crearProducto = async( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();
    const { precio, categoria, descripcion } = req.body;

    // Validation of the producto
    const productoDB =  await Producto.findOne({ nombre })
    if ( productoDB ) {
        return res.status(400).json({
            msg : `El producto: ${ productoDB.nombre } ya existe.`
        })
    }

    // Save data
    const data = { nombre, usuario : req.usuario._id, precio,
        categoria, descripcion }

    const producto = new Producto( data );
    await producto.save()

    res.status(201).json( producto )
}

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase()
    resto.usuario = req.usuario._id

    const update = await Producto.findByIdAndUpdate( id, resto, { new : true })

    res.json( update )
}

const borrarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findByIdAndUpdate( id, { estado : false }, { new : true })

    res.json({ producto })

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}