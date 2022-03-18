//Se ponen los require primero para que tome todos los recursos para el archivo
//Here is where the requires are so theses files will take the source an requierements for what is needed
require('dotenv').config();
const express = require('express')
const hbs = require('hbs');

const app = express()
const port = process.env.PORT;

// Aquí se muestran o habilita la ruta para utilizar la carpeta de partials dentro de views
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials');

// Servidor contenido estático
app.use( express.static('public') );

//Aquí se da la ruta del index o página principal, en el que al momento de ingresar a cualquier ruta te lleve aquí
//mientras el servidor esté corriendo
//Here is where the root for the index or the principal page is, in the moment when the user puts a root or an URL
//broughs you here mean while the server is running
app.get('*', (req, res) => {
    res.sendFile( __dirname + '/public/index.html');
});

//Aquí es donde el puerto se conecta o escucha para tomar el servidor
//Here is where the port is liseting the request to the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})