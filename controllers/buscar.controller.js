const { response, request } = require("express");
const { isValidObjectId } = require("mongoose");
const { Usuario, Producto, Categoria } = require("../models");


const coleccionPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async( termino = '', res = response ) => {

    const isMongoID = isValidObjectId( termino )

    if ( isMongoID ) {
        const producto = await Usuario.findById( termino )
        return res.json({
            results : ( producto ) ? [ producto ] : []
        })
    }

    // Insensetive search
    const regex = new RegExp( termino, 'i' )

    const usuarios = await Usuario.find({
        $or: [{nombre : termino} , {correo : regex}],
        $and: [{ estado : true }]
    })

    res.json({
        results : usuarios
    })
}

const buscarProductos = async( termino = '', res = response ) => {

    const isMongoID = isValidObjectId( termino )

    if ( isMongoID ) {
        const producto = await Producto.findById( termino )
        return res.json({
            results : ( producto ) ? [ producto ] : []
        })
    }

    // Insensetive search
    const regex = new RegExp( termino, 'i' )

    const productos = await Producto.find({
        $or: [{nombre : regex}],
        $and: [{ estado : true }]
    })

    res.json({
        results : productos
    })
}

const buscarCategoria = async( termino = '', res = response ) => {

    const isMongoID = isValidObjectId( termino )

    if ( isMongoID ) {
        const producto = await Categoria.findById( termino )
        return res.json({
            results : ( producto ) ? [ producto ] : []
        })
    }

    // Insensetive search
    const regex = new RegExp( termino, 'i' )

    const categorias = await Categoria.find({
        $or: [{nombre : regex}],
        $and: [{ estado : true }]
    })

    res.json({
        results : categorias
    })
}


const buscar = ( req = request, res = response ) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionPermitidas.includes( coleccion ) ) {
        return res.status(400).json({
            msg : `Las colecciones permitidas son: ${ coleccionPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res )
        break;

        case 'categoria':
            buscarCategoria( termino, res )
        break;

        case 'productos':
            buscarProductos( termino, res )
        break;

        default:
            res.status(500).json({
                msg : 'Sorry bro, falto esta.'
            });
    }


}

module.exports = { buscar }