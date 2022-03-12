//Crea lo que sería el listado con identificación de la creación de una "tarea"

const { v4: uuidv4 } = require('uuid');

class Tarea{
    id = '';
    desc = '';
    completadoEn = null;

    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

module.exports = Tarea;