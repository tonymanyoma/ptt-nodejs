const connection_DB = require('../DB');




var controller = {

	getEmpresa: (req, res) => {

		var id_usuario = req.body.id_usuario;

		connection_DB.query('SELECT * FROM companies AS C INNER JOIN guards AS G ON G.company_id = C.id where G.id = ? ', [id_usuario], (error, result) => {

			if (error) {
				throw error;
			}

			if (result.length > 0) {
				res.json(result);
			} else {
				res.send('No hay resultados');
			}

		})

	},

}


module.exports = controller;