const connection_DB = require('../DB');


var controller = {

	getDocumentos: (req, res) => {

		const sql = 'SELECT * FROM tipo_documentos';

		connection_DB.query(sql, (error, result) => {

			if (error) {
				throw error;
			}

			if (result.length > 0) {
				res.json(result);
			} else {
				res.send('No hay resultados');
			}
		});


	},



}



module.exports = controller;