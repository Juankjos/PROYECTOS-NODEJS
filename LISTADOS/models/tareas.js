const Tarea = require('./tarea');

class Tareas {
    _listado ={};

    get listadoArr(){
        //Creo nueva propiedad para el listado
        const listado = [];

        //Por propiedades de javascript, toma el objeto para crearlo en un solo arreglo
        //para mostrar todas las tareas en un solo arreglo, tomándolos por su id
        //Hace que con el foreach barre todos los strings, con el método key hace saber
        //cuáles son las tareas que han sido insertadas en el _listado
        //this._listado[key]; la extrae
        //.push(tarea) la añade al listado que es el arreglo
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    //Se ingresan los valores que se insertarán al objeto, que ahora es un arreglo
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
    
}


module.exports = Tareas;