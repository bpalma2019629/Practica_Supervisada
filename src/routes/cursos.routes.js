const express = require('express');
const cursoControllador = require('../controllers/cursos.controllers');

const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();
api.post('/agregarCurso', md_autenticacion.Auth, cursoControllador.agregarCurso);
api.get('/obtenerCursosCreados', md_autenticacion.Auth, cursoControllador.obtenerCursosUsuario);
api.put('/editarCurso/:idUsuario/:idCurso',md_autenticacion.Auth, cursoControllador.EditarCurso);

module.exports = api;