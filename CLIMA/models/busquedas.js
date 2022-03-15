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
}

module.exports = Busquedas;