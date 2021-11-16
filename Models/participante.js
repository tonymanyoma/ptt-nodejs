var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleShema = Schema({

    canal: String,
    id_usuario: String,
    usuario: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('participante', ArticleShema);