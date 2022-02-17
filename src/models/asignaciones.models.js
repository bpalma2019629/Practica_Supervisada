const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignacionesSchema = Schema({
    idCurso : {type: Schema.Types.ObjectId, ref:'cursos'},
    idAlumno: {type: Schema.Types.ObjectId, ref:'usuarios'}

});

module.exports = mongoose.model('asignaciones', AsignacionesSchema)
