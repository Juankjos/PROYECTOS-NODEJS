const { validationResult } = require('express-validator');

//Por medio de el middleware hace que las respuestas del servidor o del usuario reflejen un error de bad request
//si es que el usuario dando la petición incorrecta el servidor le devolverá este error
const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    next();
}



module.exports = {
    validarCampos
}
