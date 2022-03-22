const { validationResult } = require('express-validator');

//Manda una verificación en bad request si los campos a llenar están vacíos
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
