const controllerauten={};
const passport=require('passport');
const db=require('../conexion');

// direcciona a la vista de inicio de sesión
controllerauten.login=(req,res)=>{

    res.render('autentication/login');
};

// cerrar sesión
controllerauten.logOut=(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('./login');

};

controllerauten.ingresar= passport.authenticate('local.login',{
    successRedirect:'../inicio',
    failureRedirect:'./login',
    failureFlash:true
});




// exportar controlador
module.exports=controllerauten;