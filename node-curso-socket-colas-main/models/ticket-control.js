const path = require('path');
const fs   = require('fs');

class Ticket {
    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {


    //Inicia el constructor con los valores que deseamos
    //En la sección de tickets, se irán creando tickets desde la primera posición del arreglo y seguirá e siguiente dentro
    //del mismo arreglo
    constructor() {
        this.ultimo   = 0;
        this.hoy      = new Date().getDate(); // 11
        this.tickets  = [];
        this.ultimos4 = [];

        this.init();
    }


    //Toma los datos inicializados y los declaramos
    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    //Llamamos las funciones y decimos que estén dentro del json como modo objeto que se estará modificando en el archivo
    //Si la constante hoy es exactamente al toJson this.hoy quiere decir que estamos trabajando en el día actual
    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if ( hoy === this.hoy ) {
            this.tickets  = tickets;
            this.ultimo   = ultimo;
            this.ultimos4 = ultimos4;
        } else {
            // Es otro dia, se reinician todas las variables
            this.guardarDB();
        }
    }

    //Guarda el archivo con el file system para guardar información para el json con su respectiva ruta
    guardarDB() {

        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) );

    }

    //Da un nuevo número, lo agrega,, hace el procedimiento de que si es el último o tiene un null empuja la cola
    //y guarda en DB reflejando el número de ticket
    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket );

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio ) {

        // No tenemos tickets, si no hay datos regresa un null
        if ( this.tickets.length === 0 ) {
            return null;
        }

        //En la constante del ticket hace que si hay dentro datos con el shift lo extrae para que haya espacio constantemente
        //remueve el primer lugar del arreglo
        const ticket = this.tickets.shift(); // this.tickets[0];
        ticket.escritorio = escritorio;

        //Se despliegna los datos que serán mostrados en pantalla/escritorio, añadiéndolo al principio del arreglo
        //Haciendo que sean siempre 4 tickets y pasen de fondo, poniendo el más nuevo en el principio de la pantalla
        this.ultimos4.unshift( ticket );

        //Validamos que siempre sean 4 tickets
        if ( this.ultimos4.length > 4 ) {
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        return ticket;
    }



}



module.exports = TicketControl;