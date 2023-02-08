const { response, request } = require("express");
const { Categoria } = require("../models");

// Obtener categorias - populate {}
const obtenerCategoriasID = async( req = request, res = response) => {

    // params de paginacion
    const { id } = req.params;

    // model de Categoria
    const categorias = await Categoria.findById( id )
    .populate('usuario', 'nombre')

    res.json({
        categorias
    })
}

// Obtener categorias - paginado - total - populate
const obtenerCategoriasPopulate = async( req = request, res = response ) => {

    const { limite = 5, desde = 0, } = req.query;
    const query = { estado : true };

    const [ total, categorias ] = await Promise.all([

        Categoria.countDocuments( query ),
        Categoria.find( query )
        .populate('usuario', 'nombre')
        .limit( Number(limite) )
        .skip( desde )
    ])

    res.json({
        total, categorias
    })
}

const crearCategoria = async( req, res = response) => {

    // Convert the name of the category to uppercase
    const nombre = req.body.nombre.toUpperCase();

    // Find a category in the model of categories
    const categoriaDB = await Categoria.findOne({ nombre })
    if ( categoriaDB ) {
        return res.status(400).json({
            msg : `La categoria ${ categoriaDB.nombre } ya existe.`
        })
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario : req.usuario._id
    }

    // Save DB
    const categoria = new Categoria( data )

    await categoria.save();

    res.status(201).json(categoria)

}

// actualizarCategoria
const actualizarCategoria = async( req = request, res = response) => {

    const { id } = req.params;
    const { __v, estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase()
    //Usuario que hizo la modificacion
    resto.usuario = req.usuario._id

    const update = await Categoria.findByIdAndUpdate( id, resto, { new : true } )
    res.json( update )

}

// borrarCategoria ID- estado:false
const borrarCategoria = async( req = request, res = response) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado :  false }, { new : true })

    res.json({ categoria })
}

module.exports = {
    crearCategoria,
    obtenerCategoriasID,
    obtenerCategoriasPopulate,
    actualizarCategoria,
    borrarCategoria
}