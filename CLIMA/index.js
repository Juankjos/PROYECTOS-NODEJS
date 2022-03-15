require('dotenv').config()

const { leerInput, inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas  = require('./models/busquedas');

const main = async()=>{

    const busquedas = new Busquedas();
    let opt;

    do{
        opt = await inquirerMenu();

        switch(opt){
            case 1:
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);
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