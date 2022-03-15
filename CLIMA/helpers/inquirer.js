const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué quieres hacer?',
    choices: [
        {
            value: 1,
            name: '1. Buscar Ciudad'
        },
        {
            value: 2,
            name: '2. Historial'
        },
        {
            value: 0,
            name: '0. SALIR'
        }
    ]
}];

const inquirerMenu = async()=>{
    console.clear();
    console.log('---------------------');
    console.log('SELECCIONE OPCION');
    console.log('---------------------');

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async()=>{
    const question = [{
            type: 'input',
            name: 'enter',
            message:  `Presione ${'ENTER'.green} para continuar`  
        }];
        await inquirer.prompt(question);
}


//Aquí es donde el método de leerInput hace que lea el dato ingresado a la máquina
//y además que tenga una validación que de afuerzas deba ingresar un valor
//que sea diferente de cero para que el programa pueda correr.
//----------------------------------------------------------------
//Here is where the method of leerInput reads de data where we put it,
//also, it has a validation that makes the user get data into the program
//if is not zero, the program keeps going on
const leerInput = async(message) =>{
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if(value.lenght === 0){
                return 'Ingrese un valor krnal';
            }
            return true;
        }
    }];
    const {desc} = await inquirer.prompt(question);
    return desc;
}

//Con el map hace que retorna un nuevo arreglo, el actual transforma a los hijos
//O sea, que lo que haga en este arreglo, todos los que sean hijos tendrán esa agregación o modificación
//---------------------------------------------------------------------------
//The 'map' makes areturn inside of the array, the newest method transform the sons
//It means, that this array, every son will have a modification of it
//also, it takes de the id to return that value
const listplaces = async(lugares = [])=>{
    
    const choices = lugares.map((lugar,i) =>{
        const idx = i+1;
        return{
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0. Cancelar'
    });
    const preguntas =[{
        type: 'list',
        name: 'id',
        message: 'Choose a place',
        choices
    }]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const listadoCheck = async(tareas = [])=>{
    
    const choices = tareas.map((tarea,i) =>{
        const idx = i+1;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.compleadoEn) ? true : false
        }
    });

    const pregunta =[{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

const confirmar = async(message) =>{
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const {ok} = await inquirer.prompt(question);
    return ok;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listplaces,
    confirmar,
    listadoCheck
}