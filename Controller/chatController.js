'use strict'

var validator = require('validator');
var Chat = require('../Models/chat');
var Participante = require('../Models/participante');
var MongoClient = require('mongodb').MongoClient;

var controller = {
    datosCurso: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            autor: 'Antony manyoma',
            url: 'Antony.com',
            hola

        });
    },

    guardarMensajeChat: (obj) => {
        //crear objecto
        var chat = new Chat()
        //asignar valores

        chat.id_dueno_mensaje = obj.id_usuario;
        chat.nombre_dueno_mensaje = obj.authorMensaje;
        chat.mensaje = obj.mensaje;

        chat.save((err, articleStored) => {
            if (err || !articleStored) {
                console.log("error guardando");
                console.log(err);
            }
            //devolver respuesta
            else {
                console.log("Chat guardado correctamente!");
                console.log(articleStored);
            }

        });

    },

    guardarParticipantes: (obj) => {

        var id_usuario = obj.id_usuario;

        //crear objecto
        var participante = new Participante()
        //asignar valores

        participante.id_usuario = obj.id_usuario;
        participante.usuario = obj.usuario;

        // Buscar usuario
        var query = Participante.find({ id_usuario: id_usuario });
        query.exec((err, usuario) => {

            if (usuario != '') {
                console.log('el usuario ya se encuentra conectado');


            } else {

                participante.save((err, articleStored) => {
                    if (err || !articleStored) {
                        console.log("error guardando");
                        console.log(err);
                    }
                    //devolver respuesta
                    else {
                        console.log("info usuario guardado correctamente!");
                        console.log(articleStored);
                    }

                });


            }

        });


    },

    devolverTodosLosChatsCanal: (req, res) => {

        var params = req.body;

        var canal = params.canal;

        var query = Chat.find({ canal: canal });


        query.sort([['date']]).exec((err, chats) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error consultando chats!'
                });
            }

            if (!chats) {
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay chats guardados en la db'
                });
            }

            return res.status(200).send({
                status: 'success',
                chats
            });
        });

    },


    devolverPärticipantes: (req, res) => {

        var query = Participante.find({});


        query.sort([['date']]).exec((err, user) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'error consultando participantes!'
                });
            }

            if (!user) {
                return res.status(404).send({
                    status: 'error',
                    message: 'no hay participantes guardados en la db'
                });
            }

            return res.status(200).send({
                status: 'success',
                user
            });
        });

    },



}; //final controlador

module.exports = controller;