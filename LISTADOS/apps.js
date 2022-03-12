require('colors');

const {inquirerMenu, pausa, leerInput} = require('./helpers/inquirer');
//const Tarea = require('.models/tarea');
const Tareas = require('./models/tareas');

//Lo ejecuto de manera asíncrona, que indica que hace un proceso, espera, y luego prosigue al método siguiente
const main = async() =>{
    
    //Ciclo donde aparecerá el menú, en el que si es diferente de cero se seguirá ejecutando
    let opt = '';
    const tareas = new Tareas();
    do{
        opt = await inquirerMenu();

        switch(opt){
            case '1':
                const desc = await leerInput('Descripción: ');
                //Hace que cree la tarea y en la parte del desc hace que aparezca en el listado,
                //en la sección de tareas
                tareas.crearTarea(desc);
                break;
                
                case '2':
                    console.log(tareas._listado);
                    break;
        }
        await pausa();
    }while(opt !== '0');
    
}

main();