const controllerindex={};
const email=require('./emailcontroller');
var nodemailer = require('nodemailer');


// direcciona a la vista de inicio de sesión
controllerindex.index=(req,res)=>{

   

    res.render('./index');
};

module.exports=controllerindex;