const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();



const socketController = (socket) => {

    // Cuando un cliente se conecta muestra los tickets y sus estados en pantalla
    socket.emit( 'ultimo-ticket', ticketControl.ultimo );
    socket.emit( 'estado-actual', ticketControl.ultimos4 );
    socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
        

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        //Manda a llamar la función de siguiente en el ticket-control
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        //El broadcast hace que simultaneamente sin tener que recargar la página, hace que si un escritorio hace cierta
        //acción como agregar tareas se muestra en cualquier escritorio 
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

    });

    //Muestra en el escritorio los tickets por atender que esten guardados en la DB
    socket.on('atender-ticket', ({ escritorio }, callback) => {
        
        //Si no hay nada en el escritorio, regresa en mensaje en consola que necesita un escritorio para mostrar
        if ( !escritorio ) {
            return callback({
                ok: false,
                msg: 'Es escritorio es obligatorio'
            });
        }

        //Muestra los tickets pendientes a través del controlador
        const ticket = ticketControl.atenderTicket( escritorio );

        //Muestra los tickets en pantalla en forma real en las pantallas de los escritorios
        socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );
        socket.emit( 'tickets-pendientes', ticketControl.tickets.length);
        socket.broadcast.emit( 'tickets-pendientes', ticketControl.tickets.length);

        //Si ya no hay más tickets pendientes o dentro de la base
        if ( !ticket ) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            })
        }

    })

}



module.exports = {
    socketController
}

