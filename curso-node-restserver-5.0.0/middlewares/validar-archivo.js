const { response } = require("express")


const validarArchivoSubir = (req, res = response, next ) => {

    //Si no existen los archivos que se desean subir, mandará un error de una mala petición, en caso que esté
    //completamente vacío
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        return res.status(400).json({
            msg: 'No hay archivos que subir - validarArchivoSubir'
        });
    }

    //Si pasa del error o sea que todo esté correcto el programa continúa
    next();

}


module.exports = {
    validarArchivoSubir
}
