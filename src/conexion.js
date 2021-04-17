const mysql=require('mysql');
const {promisify}=require('util');
const {database} =require('./datosconexion');

//crea una conexión a la BDD con los parámetros de conexión
const db=mysql.createPool(database);

//utilizar conexión
db.getConnection((err,conexion)=>{

    if(conexion) 
    conexion.release();
    console.log('conectado a DB');
    return;
});

db.query= promisify(db.query);

//exportar conexión a BDD
module.exports=db;