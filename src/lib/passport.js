//definición de métodos de autenticación
const passport=require('passport');
const localstrategy=require('passport-local').Strategy;
const db=require('../conexion');
//crear autenticación
const helpers=require('./helpers');


passport.use('local.login',new localstrategy({
    //lo que se va a recibir del formulario de autenticación
    usernameField:'usuusuario',
    passwordField:'usucontrasena',
    passReqToCallback:true
    
    //proceso para autenticar al usuario de manera asíncrona
    },async (req,usuusuario,usucontrasena,callback)=>{
      
       const resultado= await db.query('SELECT * FROM  usuario WHERE usuusuario= ?',[usuusuario]);
   
       if(resultado.length>0){
           const usuario=resultado[0];
           const validarcontrasena= await helpers.desencriptarcontrasena(usucontrasena,usuario.usucontrasena);
           if(validarcontrasena){
                    const resultadorol= await db.query('SELECT * FROM rol WHERE rolid= ?',[usuario.rolid]);
                    const rol=resultadorol[0];              
               //almacenar variable de sesión
               req.session.usuario=usuario.usuusuario;
               req.session.descripcion=rol.roldescripcion;
               req.session.idrol=rol.rolid;

               callback(null,usuario,req.flash('success','Usuario: '+  req.session.usuario));
               }else{
                callback(null,false,req.flash('message','Contraseña inválida'));
           }
       }else{
          // console.log("NOOO");
          callback(null,false,req.flash('message','No se ha encontrado ningún usuario'))
       }
    
    
}));


passport.use('local.registrousuario',new localstrategy({
//lo que se va a recibir del formulario de autenticación
usernameField:'usuusuario',
passwordField:'usucontrasena',
passReqToCallback:true

//proceso para autenticar al usuario de manera asíncrona
},async (req,usuusuario,usucontrasena,done)=>{

    const {rolid}=req.body;
    console.log(req.body);
    const nuevousuario={
    usuusuario,
    usucontrasena,
    rolid
   };

   nuevousuario.usucontrasena=await helpers.encriptarcontrasena(usucontrasena);
   const resultado= await db.query('INSERT INTO usuario SET ?',[nuevousuario]);
   console.log(resultado);
   nuevousuario.usuid=resultado.insertId;
    return done(null,nuevousuario);
}));




passport.serializeUser(async(usuario,done)=>{
    done(null,usuario.usuid);
});



passport.deserializeUser(async(usuid,done)=>{
  const registro=await  db.query('SELECT * FROM usuario WHERE usuid=?',[usuid]);
  done(null,registro[0]);
});

