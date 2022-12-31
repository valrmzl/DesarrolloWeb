import mongoose from "mongoose";
import chalk from "chalk";
let mongoConnection= "mongodb+srv://admin:Harry@myapp.dxmsu6q.mongodb.net/MyAppDB";
let db=mongoose.connection;

import express, { json } from "express";
import cors from 'cors';
import * as fs from "node:fs";
const app= express();
const port=3000;
app.use(cors({
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.use(express.json());
app.get('/',(req,res)=>{
    console.log(chalk.blue("Esto es el ejercico 25"));
    res.send('Raíz del ejercico 2 ');
})
app.listen(port,()=>{
    console.log("Ejercicio 2 de la clase 25 en el puerto: "+port);

});

db.on('connecting',()=>{
    console.log(chalk.blue('Conectando...'));
    console.log(mongoose.connection.readyState);
});

db.on('connected',()=>{
    console.log(chalk.green('Conectado correctamente!!   :D'));
    console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnection,{useNewUrlParser: true});

//definieno esquema

let userSchema=mongoose.Schema({
    name: {
        type: String,
        requiered: true
    },
    correo: {
        type: String,
        requiered: true
    },
    pass: {
        type: String,
        requiered: true
    },
    edad: {
        type: Number,
        min: 0,
        max: 120,
        requiered: true
    },
    sexo: {
        type: String,
        enum: ['H','M'],
        requiered: true
    }

});

let User= mongoose.model('users', userSchema);
app.post('/api/users',(req, res) => {
    res.send('Haciendo un POST ');

    let nombre=req.body.nombre;
    let correo=req.body.correo;
    let pass=req.body.pass;
    let edad=req.body.edad;
    let sexo=req.body.sexo;

    let newUser={nombre, correo, pass, edad, sexo};

    let user=User(newUser);

    //guardar
    user.save().then((doc)=>console.log(chalk.green("Usuario creado!!: ")+ doc));
})

app.get('/api/users',(req,res)=>{
    let nombre = req.query.nombre;
    User.find({
       name:{$regex: nombre}
    },function(err,docs){
        res.send(docs);
        console.log(docs);
    });
})

app.put('/api/users',(req,res)=>{
    console.log(chalk.blueBright("Actualizando información...."));

    let id=req.body.id,
    nombre=req.body.nombre,
    correo=req.body.correo,
    sexo=req.body.sexo,
    object_to_update={},
    falg_update=false;


    if(nombre!=undefined){
        object_to_update.name=nombre;
        falg_update=true;
    }

    if(correo!=undefined){
        object_to_update.correo=correo;
        falg_update=true;
    }

    if(sexo!=undefined){
        object_to_update.sexo=sexo;
        falg_update=true;
    }

    console.log(id);
    if(falg_update){
        User.findByIdAndUpdate(id,object_to_update,{new: true},(err,doc)=>{
            if(err){
                console.log("Error"+err);
                res.send(err);
            }else{
                console.log(chalk.green("Se actualizo el usuario!"));
                console.log(doc);
                res.send(doc);
            }
        })
    }else{
        res.send("No se ha actualiado");
    }
})

app.delete('/api/users',(req,res)=>{
    console.log("elimianr");

})