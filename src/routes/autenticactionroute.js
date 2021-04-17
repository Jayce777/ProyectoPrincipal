const express= require('express');
const autenrouter=express.Router();
const passport=require('passport');
const db=require('../conexion');
const {isLoggedIn}=require('../lib/validatesession');

//requerir controlador de autenticación
const autenticationcontroller=require('../controllers/autenticationcontroller');

autenrouter.get('/login',autenticationcontroller.login);
autenrouter.post('/login',autenticationcontroller.ingresar);
autenrouter.get('/logout',isLoggedIn,autenticationcontroller.logOut);


// exportar ruta
module.exports=autenrouter;