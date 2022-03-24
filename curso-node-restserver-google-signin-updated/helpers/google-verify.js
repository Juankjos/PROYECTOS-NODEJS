const { OAuth2Client } = require('google-auth-library');

//Autoriza a la sección de google actuar y obtener su librería para las acciones que desea realiar, en este caso
//verificar que el token sea el correcto, mientras lo verifica lo contrasta con los datos del correo de Google
const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

const googleVerify = async( idToken = '' ) => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const { name: nombre, 
          picture: img, 
          email: correo
        } = ticket.getPayload();
  
  return { nombre, img, correo };

}


module.exports = {
    googleVerify
}