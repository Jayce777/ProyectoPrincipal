const express= require('express');
const indexrouter=express.Router();
const passport=require('passport');
const db=require('../conexion');
const {isLoggedIn}=require('../lib/validatesession');

//requerir controlador de autenticación
const indexcontroller=require('../controllers/indexcontroller');

indexrouter.get('/inicio',isLoggedIn,indexcontroller.index);



// exportar ruta
module.exports=indexrouter;