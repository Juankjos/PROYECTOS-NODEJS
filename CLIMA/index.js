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
                
                //Selecciona el lugar y muestra una lista
                //It choose the place showing a list
                const id = await listplaces(lugares);
                const placeCho = lugares.find(l => l.id === id);

                //Con la selección del lugar, muestra el clima que tiene
                //Choosing the place, shows the weather it has
                const clima = await busquedas.weatherPlace(placeCho.lat, placeCho.lng);

                console.clear();
                console.log('\nINFORMACIÓN DE LA CIUDAD\n');
                console.log('Ciudad: ', placeCho.nombre);
                console.log('Latitud: ', placeCho.lat);
                console.log('Longitud: ', placeCho.lng);
                console.log('Tempreatura: ', clima.temp);
                console.log('T. Mínima: ', clima.min);
                console.log('T. Máxima: ', clima.max);
                console.log('Cómo es el clima: ', clima.desc);
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