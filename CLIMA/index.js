require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listplaces } = require('./helpers/inquirer');
const Busquedas  = require('./models/busquedas');

const main = async()=>{

    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listplaces(lugares);
                const placeCho = lugares.find(l => l.id === id);

                console.log('\nINFORMACIÓN DE LA CIUDAD\n');
                console.log('Ciudad: ', placeCho.nombre);
                console.log('Latitud: ', placeCho.lat);
                console.log('Longitud: ', placeCho.lng);
                break;

                case 2:
                    break;

                    case 3:
                        break;
        }

        if (opt !==0){
            await pausa();}

    }while(opt !== 0)
}
main();