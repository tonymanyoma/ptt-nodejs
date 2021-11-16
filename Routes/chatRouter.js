'use strict'
var express = require('express');
var ChatController = require('../Controller/chatController');

var router = express.Router();

//rutas de pruebas
router.post('/datos-curso', ChatController.datosCurso);

//rutas utiles


router.post('/chatsCanal', ChatController.devolverTodosLosChatsCanal);


router.post('/participantes', ChatController.devolverPärticipantes);


module.exports = router;

