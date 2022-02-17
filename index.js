const mongoose = require('mongoose');
const app = require('./app')
const usuariosController = require('./src/controllers/usuarios.controllers');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/IN6BM2_PRACTICA2', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Se encuentra conectado a la base de datos.");
    app.listen(3000,function(){
        console.log('Hola mundo se esta corriendo en el puerto 3000')
        usuariosController.UsuarioInicial();
    })
}).catch(err => console.log(err));