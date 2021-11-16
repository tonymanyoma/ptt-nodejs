var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleShema = Schema({

	canal: String,
	id_dueno_mensaje: String,
	nombre_dueno_mensaje: String,
	mensaje: {},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('chat', ArticleShema);