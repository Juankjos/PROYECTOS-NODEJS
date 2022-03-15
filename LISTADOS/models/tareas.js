const Tarea = require('./tarea');

class Tareas {
    _listado ={};

    get listadoArr(){
        //Creo nueva propiedad para el listado | I make a new propertie for the list
        const listado = [];

        //Por propiedades de javascript, toma el objeto para crearlo en un solo arreglo
        //para mostrar todas las tareas en un solo arreglo, tomándolos por su id
        //Hace que con el foreach barre todos los strings, con el método key hace saber
        //cuáles son las tareas que han sido insertadas en el _listado
        //this._listado[key]; la extrae
        //.push(tarea) la añade al listado que es el arreglo
        //---------------------------------------------------------------------------------
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea(id = ''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){
        //Por el forEach, cada tarea que se identifique con un id lo va a tomar e identificar
        //Using the forEach, each task that identifies with an id it will take it and identify
        tareas.forEach(tarea => {
            this._listado[tareas.id] = tarea;
        });
    }

    //Se ingresan los valores que se insertarán al objeto, que ahora es un arreglo
    //The values are getting inserted inside the object, that now is an array
    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        //Toma el listado uno por uno en lo que sería el índice
        //Se le suma 1 porque en este lenguaje muestra la lista de 0 1 2 3... y si se le hace esa suma
        //aparecería como una lista de 1 2 3.. in el 0
        //En la siguiente línea, con el identificador de desc y completadoEn en el archivo json
        //con el que se están mostrando los datos y se pone en un objeto tarea
        //En la siguiente linea se toma el completadoEn con un operador ternario para abreviar
        //Si completadoEn existe '?' entonces escribimos Completado, si no existe ':' lo ponemos como pendiente
        //Si el completadoEn tiene un valor que sea diferente de null, como un número o letras lo marcará
        //como completo, en cambio si tiene el valor null lo marcará como pendiente
        //Al final se imprime en consola el número de la lista, la descripción de la tarea y el estado
        //---------------------------------------------------------------------------------
        this.listadoArr.forEach((tarea,i)=>{
            const idx = i+1;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) 
            ? 'Completado'.green 
            : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listadoPenCom(completadas = true){
        let contador = 0;
        this.listadoArr.forEach(tarea=>{
            
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) 
            ? 'Completado'.green 
            : 'Pendiente'.red;
            if(completadas){
                if(completadoEn){
                    contador +=1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            }else{
                if(!completadas){
                    contador +=1;
                    console.log(`${contador.toString().green} ${desc} :: ${estado}`);
                }
            }
        });
    }
    
    cambioCompletado(ids = []){
        ids.forEach(id=>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}


module.exports = Tareas;