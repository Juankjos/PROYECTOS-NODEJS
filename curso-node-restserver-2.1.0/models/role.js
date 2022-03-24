const { Schema, model } = require('mongoose');

//Hace que sea obligatorio al momento de crear un rol que se escriba
const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


module.exports = model( 'Role', RoleSchema );
