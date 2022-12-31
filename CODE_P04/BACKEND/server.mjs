
import chalk from "chalk";
import express, { json } from "express";
import cors from 'cors';
import * as fs from "node:fs";
import randomize from 'randomatic'
const app= express();
const port=3000;
app.use(cors({
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

//middleware

function autenticar(req, res, next) {
    if(req.get("x-user-token")){
        fs.readFile('../DATABASE/users.json', 'utf8', function(error, data) {
            if(error){
                console.log(error);
                res.sendStatus(401);
                return;
            }
            else {
                let usuarios = JSON.parse(data);
                // ver si suario tiene tokem
                //buscamos por index
                let indexUsuario;
                usuarios.forEach(function(usuario){
                    if(usuario.token==req.get("x-user-token")){
                        indexUsuario=usuario.uid;
                    }
                })
                console.log(chalk.bgCyanBright("Index de usuario: "+indexUsuario));
 
                if(indexUsuario==undefined){
                    res.status(401);
                    res.send("No hay token")
                }else{
                    req.uid=usuarios[indexUsuario].uid
                    console.log(chalk.bgCyanBright("Id de usuario: "+usuarios[indexUsuario].uid));
                    next();
                }
            }
        });
    } else {
    // No se encontró token
    res.status(401).send("Usuario no autenticado: no tiene token.");
    }
}

//app.use('/api/users',autenticar);
app.use(express.json());


app.get('/',(req,res)=>{
    console.log(chalk.blue("Esto es la práctica 3"));
    res.send('Raíz del sitio');
})
app.listen(port,()=>{
    console.log("Práctica 3 corriendo en el puerto: "+port);

});


//POST , REGISTRO DE USUARIOS
//el body debe de tener correo y password
app.post('/api/users', (req, res) => {
    console.log(chalk.blue("POST de prcatica 3"));
    let faltantes=[];
    //se omito el nombre o esta vacio
    //nombreC hace referencia a nombre Completo
    if(req.body.nombreC == undefined
        || req.body.nombreC == ''){
            faltantes.push("Nombre Completo ");
        }
    //se omiito el correo o esta vacio
    if(req.body.correo == undefined
        || req.body.correo == ''){
            faltantes.push("Correo");
        }
    //se omitio la contraseña o esta vacio
    if(req.body.password == undefined
        || req.body.password == ''){
            faltantes.push("Password");
        }
    //se omitio la fecha o esta vacio
    if(req.body.fecha == undefined
        || req.body.fecha == ''){
            faltantes.push("Fecha");
        }
     //se omitio el sexo o esta vacio
     if(req.body.sexo == undefined
        || req.body.sexo == ''){
            faltantes.push("Sexo");
        }
    //console.table(faltantes);
    if(faltantes.length!=0){
        //console.log("no se puede añadir, faltan campos");
        res.status(400);
        res.send(`No es posible añadir al nuevo usuario, hizo falta: ${faltantes.join(", ")}`);
        return;
    }
    // si campos completos entonces..
    //abriomos la databse
    fs.readFile('../DATABASE/users.json', 'utf8',function(error,data){

    if(error){
        console.log(error);
        res.sendStatus(401);
    }
         //nos tremos los usuarios del json a un arreglo
    let usuarios=data != undefined ? JSON.parse(data) : [];
    //podemos agregarlo siempre y cuando no exista
    //uno igual, nos vamos a basar solo en el correo, al igual que en la práctica 2
    console.log("usuarios:")
    console.log(data);
    let repetidos = false;
    // Buscar repetidos solo por correo
    //ya que podrian existir usuarios con el mismo nombre, pero no el mismo correo
    if(usuarios.length > 0){ 
        usuarios.forEach(function(usuario){
            if(usuario.correo.toLowerCase() == req.body.correo.toLowerCase())
            repetidos = true;
        })
    }

    //console.log(repetidos);

    //si si habia repetidos no se puede añadir
    if(repetidos==true){
        res.status(404);
        res.send("El usuario que se desea añadir ya existe. En la base de datos existe un usuario con el mismo correo.")
        return;
    }
    //podemos generarlo y añadirlo
    let uid= generarID(usuarios);
    //console.log("ID generado:");
    //console.log(uid);
    //generar url de imagen
    let imagen;
    if(req.body.imagen==undefined || req.body.imagen=='') {
        //en la p2 se genera en base al ultimo id
        //ahora debe de generarse de manera aletaoria entre 1l 0 y 99
        if(req.body.sexo.toUpperCase()=="H"){
            imagen=`https://randomuser.me/api/portraits/men/${numeroRandom(0,100)}.jpg`;
        }else{
            imagen=`https://randomuser.me/api/portraits/women/${numeroRandom(0,100)}.jpg`;
        }
    } else{
        imagen=req.body.imagen;
    }
    //console.log(imagen);
    //juntar todos los parametros para poder crear al usuario
    let nuevoUsuario={
        "uid" : uid,
        "nombreC" : req.body.nombreC,
        "correo": req.body.correo,
        "password": req.body.password,
        "fecha": req.body.fecha,
        "sexo": req.body.sexo,
        "imagen": imagen,
    };
    //aañdir al arreglo que nos habiamos traido del archivo DATABASE
    //para luego llevarlo de regreso
    usuarios.push(nuevoUsuario);
    fs.writeFile('../DATABASE/users.json',JSON.stringify(usuarios),(err)=>{
        if(err){
            res.status(400);
            res.send(`Algo salio mal, no se pudo añadir al usuario`);
        }else{
            res.status(201);
            console.log(chalk.green("El usuario fue añadido con éxito a la base de datos."))
            res.send(nuevoUsuario);
        }
    })
    })
   
  });

  function generarID(arry){
    let ids = [];
    if(arry.length <= 0)
        return 1;
    arry.forEach(function(user){
        ids.push(user.uid);
    })
    return ids[ids.length-1]+1;
}

function numeroRandom(min,max){
    return Math.floor(Math.random()* (max-min) +min);
}

app.post('/api/login', (req, res) =>{
    //res.send('Post de login')
    //se seguira la misma estructura de encontrar los faltantes
    //que se uso al momento de hacer POST a un usuario
    let faltantesLogIn=[];
    let faltantes=false;
    if(req.body.correo==undefined || req.body.correo==''){
        faltantesLogIn.push("Correo");
    }

    if(req.body.password==undefined || req.body.password==''){
        faltantesLogIn.push("Password");
    }

    if(faltantesLogIn.length>0){
        res.status(400);
        res.send(`No es posible hacer LogIn, hizo falta: ${faltantesLogIn.join(", ")}`);
    }

    //si ambos campos estan completos podemos continuar

    //obtener correo y passord de un usuario que tenga los mismos
    //en el caso de que no coincida devolver 401
    fs.readFile('../DATABASE/users.json', 'utf8', function(error, data){
        if(error){
            console.log(error);
            res.sendStatus(401);
        }
             //nos tremos los usuarios del json a un arreglo
        let usuarios=data != undefined ? JSON.parse(data) : [];
        let coincidencia=false;
        let usuarioEncontrado;
        let numUsuario=1;
        let idCoinciencia;
        let token;


        if(usuarios.length > 0){ 
            usuarios.forEach(function(usuario){
                if(usuario.correo == req.body.correo &&
                 usuario.password== req.body.password){
                    coincidencia = true;
                    usuarioEncontrado=usuario;  
                    idCoinciencia=usuario.uid;
                 }
            })
        }
        //console.log(usuarioEncontrado);

        
        //console.log("index:");
        //console.log(index);
        if(coincidencia==false){
            res.status(401);
            res.send("Los datos son incorrectos, no existe ningun usuario con esas credenciales de LogIn");
            return;
        }else {
            let index=(usuarioEncontrado.uid)-1;
            token=usuarios[index].token;
            if(token == undefined || token ==''){
                console.log("no se tiene token");
                token=randomize('Aa0','10')+'-'+idCoinciencia;//por la posición en el arreglo
                usuarios[index].token=token;
            }else{
                //se mantiene el que se tenia
                usuarios[index].token=token;
                //console.log(chalk.yellow(token));
            }
        }
        //guaardar el arrelgo de usuarios en DATABASE
        fs.writeFile('../DATABASE/users.json',JSON.stringify(usuarios),(err)=>{
            if(err){
                console.log(err);
                res.status(400);
                res.send(`Algo salio mal, no se pudo crear el Token`);
            }else{
                res.status(201);
                console.log(chalk.green("El usuario tiene disponible su token."))
                console.log(chalk.bgMagenta(token));
                res.set('x-user-token',token);
                res.send("Token del usuario: "+token);
                //header
            }
        }) 
    })
});

//listado de todos los usuarios
app.get('/api/users', (req, res) => {
    let nombre = req.query.nombreC;
    let sexo = req.query.sexo; 
    let anioStart = req.query.start; 
    let anioEnd = req.query.end;  
    let usuariosArr = [];
    let resultsArr = [];

    
    let id = req.query.uid;
    

    fs.readFile('../DATABASE/users.json', 'utf8', function(error, data) { 
        if(error) console.log(error);
        // Creamos arreglo de usuarios existentes
        usuariosArr = JSON.parse(data);

        // Cuando sólo nos pide nombre
        if(nombre != undefined && sexo == undefined) {
           //console.log("Sólo tengo nombre");
           //buscar en arreglo a ver si hay coincidencia con substring
           for(let i = 0; i < usuariosArr.length; i++) {
                if(usuariosArr[i].nombreC.toUpperCase().includes(nombre.toUpperCase())) {
                     resultsArr.push(usuariosArr[i]);
                }
           }
           //console.table(resultsArr);
           if(resultsArr.length <= 0) res.send(usuariosArr);
           
           else res.send(resultsArr);
        }
        // Cuando pide nombre y sexo
        else if(nombre != undefined && sexo != undefined) {
            for(let i = 0; i < usuariosArr.length; i++) {
                if(usuariosArr[i].nombreC.toUpperCase().includes(nombre.toUpperCase())
                && usuariosArr[i].sexo.toUpperCase().includes(sexo.toUpperCase())) {
                     resultsArr.push(usuariosArr[i]);
                }
           }
            if(resultsArr.length <= 0) res.send(usuariosArr);
            else res.send(resultsArr);
        } 
        // Cuando pide solo un año (start)
        else if(anioStart != undefined && anioEnd == undefined) {
            usuariosArr.forEach(function(userObject){
                let yearArr = userObject.fecha.split('-');
                if(yearArr[0] == anioStart)
                    resultsArr.push(userObject);
            });
            if(resultsArr.length <= 0) res.send(usuariosArr);
            else res.send(resultsArr);
        }
        // Cuando pide un rango de años (start y end)
        else if(anioStart != undefined && anioEnd != undefined) {
            usuariosArr.forEach(function(userObject){
                let yearArr = userObject.fecha.split('-');
                if(yearArr[0] >= anioStart && yearArr[0] <= anioEnd)
                    resultsArr.push(userObject);
            });
            if(resultsArr.length <= 0) res.send(usuariosArr);
            else res.send(resultsArr);
        }
        // Cuando busca id
        else if(id != undefined){
            usuariosArr.forEach(function(userObject){
                if(userObject.uid == id)
                    resultsArr.push(userObject);
            });
            if(resultsArr.length <= 0) res.send(usuariosArr);
            else res.send(resultsArr);
        }
        // Sin filtros (devolver todos los usuarios)
        else {
            //console.log("le valio y brinco");
            res.send(usuariosArr);
        }

    });

});
  
//obetener por uid
app.get('/api/users/:uid',(req,res)=>{
    let uid=req.params.uid;
    let usuarioConUid=[];
    if(uid == undefined){
        res.status(404);
        res.send("No hay ningun email para buscar");
    }else{
        fs.readFile('../DATABASE/users.json', 'utf8',function(error,data){
            //ver si existe un usuario con ese correo
            let usuarios=JSON.parse(data);
            usuarios.forEach(function(usuario){
                if(uid==usuario.uid){
                    usuarioConUid=usuario;
                }
            })
            //console.log(usuarioConCorreo);
            if(usuarioConUid<=0){
                res.status(404);
                res.send("No hay información que mostrar, no existe usuario con ese uid");
            }else{
                res.send(usuarioConUid);
            }
        })
    }

});

//:email obtener por email
app.get('/api/users/:email',(req,res)=>{
    let correo=req.params.email;
    let usuarioConCorreo=[];
    if(correo == undefined){
        res.status(404);
        res.send("No hay ningun email para buscar");
    }else{
        fs.readFile('../DATABASE/users.json', 'utf8',function(error,data){
            //ver si existe un usuario con ese correo
            let usuarios=JSON.parse(data);
            usuarios.forEach(function(usuario){
                if(correo==usuario.correo){
                    usuarioConCorreo=usuario;
                }
            })
            //console.log(usuarioConCorreo);
            if(usuarioConCorreo<=0){
                res.status(404);
                res.send("No hay información que mostrar, no existe usuario con ese email");
            }else{
                res.send(usuarioConCorreo);
            }
        })
    }

});

//put de email actualizar usuario
app.put('/api/users/:email',(req,res)=>{
    let faltantes=[];
    if(req.body.nombreC==undefined ||req.body.nombreC==''){
        faltantes.push("Nombre")
    }
    if(req.body.correo==undefined ||req.body.correo==''){
        faltantes.push("Correo")
    }
    if(req.body.password==undefined ||req.body.password==''){
        faltantes.push("Password")
    }
    if(req.body.fecha==undefined ||req.body.fecha==''){
        faltantes.push("Fecha")
    }
    if(req.body.sexo==undefined ||req.body.sexo==''){
        faltantes.push("Sexo")
    }

    if(req.body.imagen==undefined ){
        faltantes.push("URL de imagen")
    }

    if(faltantes.length>0){
        res.status(400);
        res.send(`No es posible actualizar al usuario, hizo falta: ${faltantes.join(", ")}`);
        return;
    }

    //si todos los campos a actualizar estan completos se puede actualizar
    fs.readFile('../DATABASE/users.json', 'utf8', function(error, data){
        if(error){
            console.log(error);
            res.sendStatus(401);
            return;
        }else{
            let usuarios=JSON.parse(data);
            let existe=false;
            let idModificar;
            //ver si el correo que se ingreso si existe
            usuarios.forEach(function(usuario){
                if(req.params.email==usuario.correo){
                    existe=true;
                    idModificar=usuario.uid;
                }
            })

            let index=idModificar-1;
            if(!existe){
                res.status(404);
                res.send("No hay ningun usuario que tenga el email solicitado");
                return;
            }
            //si si existe el que se va a modificar podemos seguir}
            let nuevaImagen;
            if(req.body.imagen==undefined || req.body.imagen==''){
                if(req.body.sexo.toUpperCase()=="H"){
                    nuevaImagen=`https://randomuser.me/api/portraits/men/${numeroRandom(0,100)}.jpg`;
                }else{
                    nuevaImagen=`https://randomuser.me/api/portraits/women/${numeroRandom(0,100)}.jpg`;
                }
            }else{
                nuevaImagen=req.body.imagen;
            }
            //asignacion
            usuarios[index].nombreC=req.body.nombreC;
            usuarios[index].correo=req.body.correo;
            usuarios[index].password=req.body.password;
            usuarios[index].sexo=req.body.sexo;
            usuarios[index].fecha=req.body.fecha;
            usuarios[index].imagen=nuevaImagen;
            //guardar json
            fs.writeFile("../DATABASE/users.json", JSON.stringify(usuarios), (err) => {
                if (err)
                console.log(err);
                else {
                console.log(chalk.green("Se actualizaron los datos en el DATABSE"));
                res.status(201);
                res.send(usuarios[index]);
                return;
                }
            });
        }
    });
});
//eliminar usuario
app.delete('/api/users/:uid',(req,res)=>{
    let correoDelete=req.params.uid;
    if(correoDelete==undefined){
        res.status(404);
        res.send("No se envio ningun usuario para eliminar");
        return;
    }else{
        //abrir json y buscar la coincidencia del correo que se
        //desea eliminar 
        fs.readFile('../DATABASE/users.json', 'utf8',function(error,data){
            if(error){
                console.log(error);
                res.sendStatus(401);
                return;
            }else{
                let usuarios=JSON.parse(data);
            let existe=false;
            let idBorrar;
            //ver si el correo que se ingreso si existe
            usuarios.forEach(function(usuario){
                if(req.params.uid==usuario.uid){
                    existe=true;
                    idBorrar=usuario.uid;
                }
            }) 
            let index=idBorrar-1;
            if(!existe){
                res.status(404);
                res.send("No hay ningun usuario que tenga el email solicitado para ser eliminado");
                return;
            }
            //podemos borrar al usuario
            usuarios.splice(index,1);
            //guardar en json
            fs.writeFile("../DATABASE/users.json",JSON.stringify(usuarios),(err)=>{
                if (err)
                console.log(err);
                else {
                console.log(chalk.green("Se elimino el usuario en el DATABSE"));
                res.status(201);
                res.send(usuarios);
                return;
                }
            })
            }
        });
    }
});

