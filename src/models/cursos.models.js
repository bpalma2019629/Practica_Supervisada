const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursosSchema = Schema({
    nombreCurso: String,
    idMaestro: {type: Schema.Types.ObjectId, ref:'usuarios'}
})

module.exports = mongoose.model('cursos', CursosSchema);
