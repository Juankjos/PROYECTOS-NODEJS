const { response } = require('express')

//Si en el request el usuario no existe, se manda un error por parte del servidor para el frontend
const esAdminRole = ( req, res = response, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    }

    //Aquí se hace una verificación de permisos de usuario a través del rol, mientras que, por ejemplo, ADMIN_ROLE
    //No sea acorde a esa propiedad del usuario no da permiso de realizar ciertas acciones. Se manda un error de 
    //autenticación incorrecta
    const { rol, nombre } = req.usuario;
    
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}


const tieneRole = ( ...roles  ) => {
    return (req, res = response, next) => {
        
        //Si no existe un request en el usuario, se manda un error por parte del servidor
        if ( !req.usuario ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
        
        //Si los usuarios no incluyen algún rol que esté especificado o guardado en la DB, se manda un error de 
        //autenticación en el que si el usuario no cuenta con ese rol especificado no lo hará continuar
        if ( !roles.includes( req.usuario.rol ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }


        next();
    }
}



module.exports = {
    esAdminRole,
    tieneRole
}