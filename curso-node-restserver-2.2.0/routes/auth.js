const { Router } = require('express');
const { check } = require('express-validator');

// Rutas para la autenticación/Ingreso de cualquier usuario
const { validarCampos } = require('../middlewares/validar-campos');


const { login } = require('../controllers/auth');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );



module.exports = router;