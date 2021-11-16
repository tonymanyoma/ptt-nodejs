const connection_DB = require('../DB');



function getCanal (callback)  {


    connection_DB.query('SELECT * FROM empresas', function (err, result){
      if(err)throw err;
        callback(result);

   });



}



module.exports = { getCanal } 



// var controller = {

//     getCanal: (req, res) => {

//         const sql = 'SELECT * FROM empresas';

// 		connection_DB.query(sql, (error, result) => {

// 			if (error) {
// 				throw error;
// 			}

// 			if (result.length > 0) {
// 				res.json(result);
// 			} else {
// 				res.send('No hay resultados');
// 			}
// 		});

 
//     }

// }



// module.exports = controller;

