const path = require('path');
const { v4: uuidv4 } = require('uuid');

//Valida que las imágenes sean de ese tipo y asigna una carpeta vaacía en forma de string
const subirArchivo = ( files, extensionesValidas = ['png','jpg','jpeg','gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        // Validar la extension
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        }
        
        //Asigna el espacio para las imágenes dentro de la carpeta uploads dentro del sarchivo, y clasificando el archivo
        //Con el tipo de extensión permitido
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp );

        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nombreTemp );
        });

    });

}



module.exports = {
    subirArchivo
}