const bcryptjs=require('bcryptjs');

const helpers={};

//encriptación
helpers.encriptarcontrasena=async (pass)=>{

 const salt=  await bcryptjs.genSalt(10);
 //cifra la contraseña basado en la cadena salt
 const hash=  await bcryptjs.hash(pass,salt);

 return hash;
};

helpers.desencriptarcontrasena=async (usucontrasena,passdb)=>{
try {
    return await bcryptjs.compare(usucontrasena,passdb);

} catch (error) {
    console.log(error);
}

};


module.exports=helpers;