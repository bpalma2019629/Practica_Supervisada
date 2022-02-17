const express = require('express');
const usuariosController = require('../controllers/usuarios.controllers');
const md_autenticacion = require('../middlewares/autenticacion');

var api= express.Router();


api.post('/registrarAlumno', usuariosController.RegistrarAlumnos);
api.post('/registrarMaestro', usuariosController.RegistrarMaestros);
api.post('/login', usuariosController.Login);
api.put('/editarUsuario/:idUsuario',md_autenticacion.Auth, usuariosController.EditarUsuario);
api.delete('/eliminarUsuario/:idUsuario',md_autenticacion.Auth, usuariosController.EliminarUsuario);

module.exports = api;