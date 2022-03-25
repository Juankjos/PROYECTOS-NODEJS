class Mensaje {
    constructor( uid, nombre, mensaje ) {
        this.uid     = uid;
        this.nombre  = nombre;
        this.mensaje = mensaje;
    }
}


class ChatMensajes {

    
    constructor() {
        this.mensajes = [];
        this.usuarios = {};
    }

    //Obtiene los ultimos 10 mensajes que se manden a partir del cero
    get ultimos10() {
        this.mensajes = this.mensajes.splice(0,10);
        return this.mensajes;
    }

    //Lo maneja como un arreglo, toma los valores del usuario y cada usuario está dentro de las llaves y todo dentro de un arreglo 
    get usuariosArr() {
        return Object.values( this.usuarios ); // [ {}, {}, {}]
    }

    //Al mandar el mensaje muestra los datos de un usuario llamando al constructor de hasta arriba
    enviarMensaje( uid, nombre, mensaje ) {
        this.mensajes.unshift(
            new Mensaje(uid, nombre, mensaje)
        );
    }

    //Se identifica a cada usuario en un arreglo y se señala al usuario 
    conectarUsuario( usuario ) {
        this.usuarios[usuario.id] = usuario
    }

    //Borra al usuario del chat si se desconecta, lo elimina caducandoesa "sesión"
    desconectarUsuario( id ) {
        delete this.usuarios[id];
    }

}

module.exports = ChatMensajes;