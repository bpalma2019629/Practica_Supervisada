const express = require('express');
const cors = require('cors');
var app = express();

const UsuarioRutas = require('./src/routes/usuarios.routes');
const CursosRutas = require('./src/routes/cursos.routes');
const AsignacionesRutas = require('./src/routes/asignaciones.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use('/api', UsuarioRutas, CursosRutas, AsignacionesRutas);

module.exports = app;