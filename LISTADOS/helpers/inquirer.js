const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué quieres hacer?',
    choices: [
        {
            value: '1',
            name: '1. Crear tarea'
        },
        {
            value: '2',
            name: '2. Listado tareas'
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

module.exports = {
    inquirerMenu,
    pausa,
    leerInput
}