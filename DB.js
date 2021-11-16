
const { Client } = require('pg');

const client = new Client({
   user: 'postgres',
   host: 'localhost',
   database: 'control_turnos_development',
   password: 'root',
   port: 5432,
});

client.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta a fusepong');
   }
});

module.exports = client;