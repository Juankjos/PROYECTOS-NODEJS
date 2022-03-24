const fs = require('fs');
const axios = require('axios');

class Busquedas{

    historial = [];
    dbPath = './db/database.json';
    //Lee la base de datos si existe
    //It reads de data base if exists
    constructor(){
        this.readDB();
    }

    //Para poner todas las primeras palabras en mayúsculas, tomamos el historial y creamos una variable que tome
    //los lugares que se tomaron, que divida las palabras y que dentro de un arreglo, clasificar cada palabra del 
    //string
    get historialCap(){
        return this.historial.map(lugar =>{

            let palabras = lugar.split('');
            palabras = palabras.map(p=>p[0].toUpperCase() + p.substring(1));

            return palabras.join('');
        });
    }

    //En esta sección, se declaran los parámetros de la aplicación que mandamos llamar,
    //Cuántos resultados se van a imprimir (5)
    //Y mi token de acceso que aparece en la app que cree ahí mismo
    //--------------------------------------------
    //In this section, it declares the params inside the app that we call,
    //How many results are gonna show
    //And my token that I created in the app of Geocoding
    get paramsMapbox(){
        return{
            'limit': 5,
            'access_token': process.env.MAPBOX_KEY
        }
    }

    get paramsWeather(){
        return{
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric'
        }
    }

    //Por medio de la app y su URL, al momento de ingresar el lugar, lo busca por medio de la app y axios
    //Después, manda a imprimir los datos más en específico que son respectivos del lugar
    //---------------------------------------------
    //Using the app of Geocoding and it's URL, it searchs it meanwhile using the same app and axios
    //After that, it prints the data of the place we searched 
    async ciudad(lugar = ''){
        try{
            const intance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar=>({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

            }catch(error){
                return [];
        }
    }

    
    //Lo mismo que el punto anterior, toma los parámetros de la aplicación y los da en pantalla
    //The same of the last point, it takes the params from the application and send it to the screen
    async weatherPlace(lat, lon){
        try{
            const instance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            });
            const resp = await instance.get();
            const {weather, main} = resp.data;
            return{
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
    
        }catch(error){
            console.log(error);
        }
    }

    makeRecord(lugar= ''){

        //Si el historail incluye el lugar que se ingresó, con el localLowerCase, se hace un return
        //porque así significa que no tiene que guardar nada para el historial
        //If historial includes the lugar that the user typed, using localLoweCase, we are using a return
        //that it means that it doesn't have to store something in the historial
        
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ){
            return;
        }
        this.historial = this.historial.splice(0,5);

        this.historial.unshift( lugar.toLocaleLowerCase() );

        this.storeDB();
    }

    storeDB(){
        const payload = {
            hitorial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    readDB(){
        if(!fs.existsSync(this.dbPath)) return;
            const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
            const data = JSON.parse(info);

            this.historial = data.historial;
    }
    
}


module.exports = Busquedas;