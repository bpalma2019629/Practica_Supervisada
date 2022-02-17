const express = require('express');
const asignacionControlador = require('../controllers/asignaciones.controllers');

const md_autenticacion = require('../middlewares/autenticacion');
const api = express.Router();
api.post('/agregarAsignacion', md_autenticacion.Auth, asignacionControlador.agregarAsignacion);
api.get('/obtenerCursosAsignados', md_autenticacion.Auth, asignacionControlador.obtenerAsignacionesUsuario);


module.exports = api;