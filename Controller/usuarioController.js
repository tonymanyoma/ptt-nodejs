const connection_DB = require('../DB');
const jwt = require('jsonwebtoken');



var controller = {

	Login: (req, res) => {

		var usuario = req.body.usuario;
		var password = req.body.password;

		connection_DB.query('SELECT * FROM usuarios where usuario = ? AND password = ?', [usuario, password], (error, result) => {

			if (error) {
				throw error;
			}

			if (result.length > 0) {
				//res.json(result);

				jwt.sign({ foo: 'bar' }, 'secretkey', (err, token) => {
					res.json({
						token: token,
						user: result
					})
				});

			} else {
				res.json({
					code: 1
				})
			}

		})

	},

	Register: (req, res) => {


		var usuario = req.body.usuario;
		var numero_documento = req.body.numero_documento;

		const userObj = {
			nombre_completo: req.body.nombre_completo,
			id_tipo_documento: req.body.id_tipo_documento,
			numero_documento: req.body.numero_documento,
			direccion: req.body.direccion,
			telefono: req.body.telefono,
			id_role: req.body.id_role,
			usuario: req.body.usuario,
			password: req.body.password,

		}


		//validar si el usuario ya se encuentra registrado
		connection_DB.query('SELECT * FROM usuarios where usuario = ? OR numero_documento = ? ', [usuario, numero_documento], (error, result) => {

			if (error) {
				throw error;
			}

			if (result.length > 0) {

				res.json({
					msj: "el usuario ya se encuentra registrado",
					code: 1
				})

			} else {

				const sql = 'INSERT INTO usuarios SET ?';


				connection_DB.query(sql, userObj, (error, result) => {

					if (error) {
						throw error;
					} else {
						res.json({
							msj: "estudiante registrado con éxito",
							code: 2
						})
					}

				})


			}

		})



	},

	Home: (req, res) => {



	},


	getUsuarios: (req, res) => {

		jwt.verify(req.token, 'secretkey', (error, authData) => {
			if (error) {
				res.sendStatus(403);
			} else {

				const sql = 'SELECT * FROM usuarios';

				connection_DB.query(sql, (error, result) => {

					if (error) {
						throw error;
					}

					if (result.length > 0) {
						res.json(result);
					} else {
						res.send('No hay resultados');
					}

				})


				res.json({
					msj: "autorizado"
				})
			}
		});



	},

	saveUsuario: (req, res) => {

	}


}



module.exports = controller;