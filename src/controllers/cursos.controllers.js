const Curso = require("../models/cursos.models");
const asignacionControlador = require("../controllers/asignaciones.controllers");

function agregarCurso(req, res) {
  var parametros = req.body;
  var cursoModel = new Curso();

  if (req.user.rol == "Maestro") {
    if (parametros.nombreCurso) {
      cursoModel.nombreCurso = parametros.nombreCurso;
      cursoModel.idMaestro = req.user.sub;

      Curso.find({ nombreCurso: cursoModel.nombreCurso }, (err, cursoEncontrado) => {
        if (cursoEncontrado.length == 0) {
          cursoModel.save((err, cursoGuardado) => {
            if (err)
              return res.status(500).send({ mensaje: "Error en la peticion" });
            if (!cursoGuardado)
              return res
                .status(500)
                .send({ mensaje: "Error al guardar el curso" });

            return res.status(200).send({ Curso: cursoGuardado });
          });
        } else {
          return res.status(500).send({ mensaje: "Este curso ya esta creado" });
        }
      });
    } else {
      return res
        .status(500)
        .send({ mensaje: "Debe rellenar todos los campos" });
    }
  } else {
    return res.status(500).send({ mensaje: "No esta Autorizado" });
  }
}

function obtenerCursosUsuario(req, res) {
  Curso.find({ idMaestro: req.user.sub }, (err, cursosCreados) => {
    if (err) return res.status(500).send({ mensaje: "Error en la peticion" });
    if (!cursosCreados)
      return res.status(500).send({ mensaje: "Error al obtener los Cursos" });

    return res.status(200).send({ cursos: cursosCreados });
  }).populate("idMaestro", "nombre usuario");
}

function EditarCurso(req,res){
    var idUser = req.params.idUsuario;
    var idCur = req.params.idCurso;
    var parametros = req.body;
    if(req.user.rol == 'Maestro'){
        if(idUser !== req.user.sub) return res.status(500).send({mensaje: 'no puede editar otros usuarios'});
        Curso.findByIdAndUpdate(idCur, parametros,{new:true}, (err, usuarioActualizado) =>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if (!usuarioActualizado) return res.status(404).send({mensaje: 'Error al Editar el Usuario'})
        return res.status(200).send({usuario: usuarioActualizado});
    })

    }else{
        return res.status(500).send({mensaje:"Usted no esta autorizado"});
    }
}



module.exports = {
  agregarCurso,
  obtenerCursosUsuario,
  EditarCurso
};
