var express = require('express');
var UsuarioController = require('../Controller/usuarioController');
var DocumentoController = require('../Controller/documentoController');
var EmpresaController = require('../Controller/empresaController')

var router = express.Router();

function verifyToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


// Login
router.post('/login', UsuarioController.Login);
router.post('/register', UsuarioController.Register);

//documentos
router.get('/tiposDocumentos', DocumentoController.getDocumentos);

router.post('/getEmpresa', EmpresaController.getEmpresa);

// Rutas de usuarios
router.get('/', UsuarioController.Home);
router.get('/usuarios', verifyToken, UsuarioController.getUsuarios);
router.post('/add', UsuarioController.saveUsuario);

module.exports = router;