require('colors');

const mostrarMenu = () => {

    //Realizo una "promesa" en el que hago que si todo está correcto se ejecutará el método hasta donde está
    //el resolve, en el que se introduce la opción que se ingresará por la línea de comandos
    return new Promise(resolve =>{
    console.clear();
    console.log('---------------------');
    console.log('SELECCIONE OPCION');
    console.log('---------------------');

    console.log(`${ '1.'.green} Crear tarea`);
    console.log(`${ '2.'.green} Lista tareas`);
    console.log(`${ '3.'.green} Lista tareas Completas`);
    console.log(`${ '3.'.green} Lista tareas Pendientes`);
    console.log(`${ '5.'.green} Crear tarea`);
    console.log(`${ '6.'.green} Borrar tarea`);
    console.log(`${ '0.'.green} Salir\n`);

    const readline = require ('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Seleccione una opción: ',(opt)=>{
        readline.close();
        resolve(opt);
    })
    });

}

const pausa = () => {
    return new Promise(resolve =>{
        const readline = require ('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Presione ENTER para continuar ',(opt)=>{
            
            readline.close();
            resolve();
        })
    })
    
}

module.exports = {
    mostrarMenu,
    pausa
}