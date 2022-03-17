const axios = require('axios');

class Busquedas{

    historial = ['Tehotihuacan','Mixapuesto','Yucatán'];

    constructor(){

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
    
}


module.exports = Busquedas;