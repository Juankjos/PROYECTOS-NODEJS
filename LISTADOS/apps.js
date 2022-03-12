require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {inquirerMenu, pausa, leerInput, listadoBorrar} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

//Lo ejecuto de manera asíncrona, que indica que hace un proceso, espera, y luego prosigue al método siguiente
//It executes in asynchronous way, that it points of the making of a process, then, goes to the next method
const main = async() =>{
    
    //Ciclo donde aparecerá el menú, en el que si es diferente de cero se seguirá ejecutando
    //Here the menu will appear using a cycle, if is equal to zero the program will be finished
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Descripción: ');
                //Hace que cree la tarea y en la parte del desc hace que aparezca en el listado,
                //en la sección de tareas
                //It creates a task and the part of desc makes an apparence of the list
                //for the section of tareas/tasks
                tareas.crearTarea(desc);
                break;
                
                case '2':
                    tareas.listadoCompleto();
                    break;
                    case '3':
                        tareas.listadoPenCom(true);
                        break;
                        case '4':
                            tareas.listadoPenCom(false);
                            break;
                            case '5':
                                break;
                                case '6':
                                    const id = await listadoBorrar(tareas.listadoArr);
                                    console.log({id});
                                    break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    }while(opt !== '0');
    
}

main();