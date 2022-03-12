const fs = require('fs');
//Crea nuestra "base de datos" donde los datos que ingresemos dentro de la lista
    //se cree un json para guardar esos datos, haciendo que el .json se convierta
    //en un string con la propiedad de java con stringify tomando el valor de la función
    //que es data
    //-------------------------------------------------------------------------------
    //We create our data base where the data we insert inside the list makes or creates a json file
    //so it will save the information or data, so in this line it will convert the json string
    //using the property of java fs for data
const archivo ='./db/data.json';

const guardarDB = (data)=>{ 
    //Con fs es una función que ayuda a crear archivos
    //fs is the function that creates the files
    fs.writeFileSync(archivo,JSON.stringify(data));
}

const leerDB = () =>{
    //Verifica si el archivo existe o no, como no existe retorna null
    //Verifies if the file exist or not, so here it doesn't, returns null
    if(!fs.existsSync(archivo)){
        return null;
    }
    //Aquí lo que hace es que lee el archivo existente en su tipo de archivo que es utf-8,
    //lo toma como objeto y lee todo el archivo
    //------------------------------------------------------
    //Here we read the existing file where it's type is utf-8
    //it takes it as an object and reads all the file
    const info = fs.readFileSync(archivo,{encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
}

module.exports = {
    guardarDB,
    leerDB
}