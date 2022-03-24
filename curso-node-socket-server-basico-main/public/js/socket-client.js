
// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');


const socket = io();


//Estas funciones sirven para cuando se declare un estado del cliente tome estas referencias HTML para mostrar en frontend
socket.on('connect', () => {
    // console.log('Conectado');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');

    lblOnline.style.display  = 'none';
    lblOffline.style.display = '';
});


socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

//Con la función dirigida hacia el botón y tomando los datos de escritura, al momento de hacer clic manda un mensaje
//con los datos en tiempo real y los datos del usuario que mandó el mensaje
btnEnviar.addEventListener( 'click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }
    
    //Emite el evento con el emit y tomando el id del mensaje lo toma y lo envía
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id );
    });

});