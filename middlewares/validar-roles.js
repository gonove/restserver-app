const { response, request } = require("express")

const isAdminRole = (req = request, res = response, next) => {

    // El req.usuario viene del middleware validarJWT
    if ( !req.usuario ) {
        return res.status(500).json({
            msg : 'Se quiere validar el rol sin antes validar el token 💔'
        })
    }

    const { rol, nombre } = req.usuario
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg : `${ nombre } no es administrador - No puede hacer esto.`
        })
    }

    next( )
}

// Operador rest, trae todo los parametros recibos en un []
const hasRole = ( ...roles ) => {

    return (req = request, res = response, next) => {

        // El req.usuario viene del middleware validarJWT
        if ( !req.usuario ) {
            return res.status(500).json({
                msg : 'Se quiere validar el rol sin antes validar el token 💔'
            })
        }

        if (!roles.includes( req.usuario.rol ) ) {

            res.status(401).json({
                msg : `El servicio requiere uno de estos roles ${ roles }`
            })

        }

        next()
    }

}


module.exports = { isAdminRole, hasRole }
