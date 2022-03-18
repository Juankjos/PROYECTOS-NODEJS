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
                //Evita el error de presionar cero para cancelar
                //Avoids the error pressing it zero to cancel
                if(id === '0') continue;
                const placeCho = lugares.find(l => l.id === id);

                //Hace que al momento de ingresar algo se guarde en el historial
                //It makes at the moment the user tipes and enter the citie, it store the data inside the method
                busquedas.makeRecord(placeCho.nombre);

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
                    //Utiliza el modelo busquedas, toma el método historial y con un foreach recorre
                    //el arreglo del lugar y el contador de i, se realiza una constante en el que idx 
                    //es el índice, y para que no aparezca como 0 1 2 3 se agrega +1 para que se vea 1 2 3...
                    //Por último imprime los resultados del lugar
                    //_-------------------------------------
                    //Using the model of busquedas, takes the method of historial and using a foreach
                    //goes by the array of lugar and a counter of i, a constant is created that it will be the index
                    //using a +1 so when it shows 1 2 3 instead of 0 1 2 3
                    //At leats, it prints the results of lugar 
                    busquedas.historialCap.forEach((lugar, i)=>{
                        const idx = `${i+1}`;
                        console.log(`${idx} ${lugar}`);
                    });
                    break;

                    case 3:
                        break;
        }

        if (opt !==0){
            await pausa();}

    }while(opt !== 0)
}
main();