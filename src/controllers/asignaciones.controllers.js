const Asignaciones = require('../models/asignaciones.models');

function agregarAsignacion(req,res){
    var parametros = req.body;
    var asignacionModel = new Asignaciones();

    
    if(req.user.rol == 'Alumno'){
        Asignaciones.find({ idAlumno : req.user.sub}, (err, Registros) =>{
            if(Registros.length != 3){
                if(parametros.idCurso){
                    asignacionModel.idCurso = parametros.idCurso;
                    asignacionModel.idAlumno = req.user.sub;
                    Asignaciones.find({idCurso: parametros.idCurso}, (err, asignacionEncontrada)=> {
                        if(asignacionEncontrada.length == 0){
                            asignacionModel.save((err, asignacionGuardada)=>{
                                if(err) return res.status(500).send({mensaje: "Error en la peticion"});
                                if(!asignacionGuardada) return res.status(500).send({mensaje: "Error al guardar la asignacion"});
                    
                                return res.status(200).send({asignacion: asignacionGuardada});
                            })
                        } else {
                            return res.status(500).send({mensaje: 'ya se asigno a este curso'})
                        }
                    })
                }else{
                    return res.status(500).send({mensaje:"Debe rellenar todos los campos"});
                }
            }else{
                return res.status(500).send({mensaje:"No puede asignarse a mas de 3 cursos"});
            }
        })
    }else{
        return res.status(500).send({mensaje:"Usted no es un Alumno"});
    }
    
};

function obtenerAsignacionesUsuario(req, res){
    Asignaciones.find({ idAlumno : req.user.sub}, (err, cursosAsignados) =>{
        if(err) return res.status(500).send({mensaje: "Error en la peticion"});
        if(!cursosAsignados) return res.status(500).send({mensaje: "Error al obtener los Cursos"});

        return res.status(200).send({asignaciones: cursosAsignados});
    }).populate('idCurso', 'nombreCurso').populate('idAlumno','nombre usuario');
}


module.exports = {
    agregarAsignacion,
    obtenerAsignacionesUsuario
}
