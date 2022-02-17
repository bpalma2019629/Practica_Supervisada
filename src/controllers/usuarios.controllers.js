const Usuarios = require('../models/usuarios.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt')
const md_autenticacion = require('../middlewares/autenticacion')

//Registrar

function UsuarioInicial(){
    var usuariosModels = new Usuarios();

        usuariosModels.nombre = 'Erick';
        usuariosModels.usuario = 'MAESTRO';
        usuariosModels.rol = 'Maestro';

        Usuarios.find((err, usuarioEncontrado)=> {
            if(usuarioEncontrado.length == 0){

                bcrypt.hash('123456', null, null, (err, paswordEncriptada)=>{
                    usuariosModels.password = paswordEncriptada;
                });
                usuariosModels.save()
            }
        })
}

function RegistrarAlumnos(req, res){
    var parametros = req.body;
    var usuariosModels = new Usuarios();

    if(parametros.nombre,parametros.usuario, parametros.password){
        usuariosModels.nombre = parametros.nombre;
        usuariosModels.usuario = parametros.usuario;
        usuariosModels.rol = 'Alumno';

        Usuarios.find({usuario: parametros.usuario}, (err, usuarioEncontrado)=> {
            if(usuarioEncontrado.length == 0){

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada)=>{
                    usuariosModels.password = passwordEncriptada;
                });
                usuariosModels.save((err, usuarioGuardado)=>{
                    if(err) return res.status(500).send({mensaje:"Error en la peticion"});
                    if(!usuarioGuardado) return res.status(400).send({mensaje:"Error al agregar el usuario"});
                    return res.status(200).send({usuario: usuarioGuardado});
                })
            } else {
                return res.status(500).send({mensaje: 'Este usuario ya se encuentra utilizado'})
            }
        })
    }
}

function RegistrarMaestros(req, res){
    var parametros = req.body;
    var usuariosModels = new Usuarios();

    if(parametros.nombre,parametros.usuario, parametros.password){
        usuariosModels.nombre = parametros.nombre;
        usuariosModels.usuario = parametros.usuario;
        usuariosModels.rol = 'Maestro';

        Usuarios.find({usuario: parametros.usuario}, (err, usuarioEncontrado)=> {
            if(usuarioEncontrado.length == 0){

                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada)=>{
                    usuariosModels.password = passwordEncriptada;
                });
                usuariosModels.save((err, usuarioGuardado)=>{
                    if(err) return res.status(500).send({mensaje:"Error en la peticion"});
                    if(!usuarioGuardado) return res.status(400).send({mensaje:"Error al agregar el usuario"});
                    return res.status(200).send({usuario: usuarioGuardado});
                })
            } else {
                return res.status(500).send({mensaje: 'Este usuario ya se encuentra utilizado'})
            }
        })
    }
}

//Login
function Login(req, res){
    var parametros = req.body;

    Usuarios.findOne({usuario: parametros.usuario}, (err, usuarioEncontrado) =>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion"});
        if(usuarioEncontrado){
            bcrypt.compare(parametros.password, usuarioEncontrado.password, (err, verificacionPassword)=>{
                if(verificacionPassword){
                    if(parametros.obtenerToken === 'true'){
                        return res.status(200).send({token: jwt.crearToken(usuarioEncontrado)})
                    }else{
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({usuario: usuarioEncontrado})
                    }
                }else{
                    return res.status(500).send({mensaje: 'la pasword no coincide'})
                }
            })

        }else{
            return res.status(500).send({mensaje:"Error, el correo no se encuentra registrado"})
        }
    })
}

//Editar
function EditarUsuario(req,res){
    var idUser = req.params.idUsuario;
    var parametros = req.body;
    if(idUser !== req.user.sub) return res.status(500).send({mensaje: 'no puede editar otros usuarios'});
    Usuarios.findByIdAndUpdate(req.user.sub, parametros,{new:true}, (err, usuarioActualizado) =>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if (!usuarioActualizado) return res.status(404).send({mensaje: 'Error al Editar el Usuario'})
        return res.status(200).send({usuario: usuarioActualizado});
    })
}

//Eliminar
function EliminarUsuario(req,res){
    var idUser = req.params.idUsuario;
    if(idUser !== req.user.sub) return res.status(500).send({mensaje: 'no puede eliminar otros usuarios'});
    Usuarios.findByIdAndDelete(idUser, (err, userEliminado) =>{
        if (err) return res.status(500).send({mensaje:'Error en la peticion'});
        if (!userEliminado) return res.status(404).send({mensaje: 'Error al Eliminar el Usuario'})
        return res.status(200).send({usuario: userEliminado});
    }) 
}



module.exports = {
    UsuarioInicial,
    RegistrarAlumnos,
    RegistrarMaestros,
    Login,
    EditarUsuario,
    EliminarUsuario

}