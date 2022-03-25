const { Socket } = require('socket.io');
const { comprobarJWT } = require('../helpers');
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();


const socketController = async( socket = new Socket(), io ) => {

    //Espera l acomprobación por parte del socket cada que un cliente se conecte y se verifica ese token
    //Si el usuario no existe, desconecta al usuario que trata de entrar
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if ( !usuario ) {
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario );
    io.emit('usuarios-activos',     chatMensajes.usuariosArr );
    //Hace que en cualquier sesión de usuarios, aunque no estén conectados, reciban o tengan un historial de mensajes
    socket.emit('recibir-mensajes', chatMensajes.ultimos10 );

    // Conectarlo a una sala especial, manda mensajes privados para uno o varios usuarios
    socket.join( usuario.id ); // global, socket.id, usuario.id
    

    // Limpiar cuando alguien se desconeta, limpia la consola cuando un usuario se desconect y muestra los usuarios que sí están activos
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    })

    socket.on('enviar-mensaje', ({ uid, mensaje }) => {
        
        if ( uid ) {
            // Mensaje privado en una sala para uno o varios usuarios, con los datos de usuario y el contenido del mensaje
            socket.to( uid ).emit( 'mensaje-privado', { de: usuario.nombre, mensaje });
        } else {
            //Para enviar a uno o todos los usuarios mensajes
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje );
            io.emit('recibir-mensajes', chatMensajes.ultimos10 );
        }

    })

    
}



module.exports = {
    socketController
}