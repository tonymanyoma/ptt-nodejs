//requiriendo dependencias 
const express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const socketio = require('socket.io')
const http = require('http')
//instancia de express
const app = express()
const server = http.createServer(app)

var mongoose = require('mongoose');

// var ChatController = require('./Controller/chatController');
// var Chat_routes = require('./Routes/chatRouter');
// var Canal = require('./Controller/canalController')

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('usuario conectado');

  
  socket.on('voice', (msg) => {

      socket.broadcast.emit(msg.canal, {"canal":msg.canal, "mensaje":msg.mensaje});
      console.log('conectado al canal', 'voice' )
      console.log('data socket', msg);

  }); 

  socket.on('transmitter', (msg) => {

    socket.broadcast.emit(msg.canal, {"canal":msg.canal,"record":msg.record,"name":msg.name });
    console.log('conectado al canal', 'transmitter' )
    console.log('data socket', msg);
}); 


  socket.on('disconnect', (msg) => {
    console.log('usuario desconectado');
  });
});


//iniciando el server de socket.io
const PORT2 = process.env.PORT || 4020


//corriendo el servidor de socket io
server.listen(PORT2, () => {
  console.log(`Server socket running on port ${PORT2}`)
})


// mongoose.set("useFindAndModify", false);
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://127.0.0.1:27017/cursoChats", { useNewUrlParser: true })
//   .then(() => {

//     console.log("conexion exitosa! mongoDB");

//   });
