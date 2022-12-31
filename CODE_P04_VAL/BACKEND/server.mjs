import chalk from "chalk";
import express, { json } from "express";
import cors from 'cors';
import * as fs from "node:fs";
//import randomize from 'randomatic'
const app= express();
const port=3000;
app.set('vie engine','ejs');
app.use(cors({
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.get('/',(req,res)=>{
    console.log(chalk.blue("Esto es la práctica 3"));
    //res.send('Raíz del sitio');
    //const htmlFile=path.join(__dirname,'/indexhtml');
    //res.sendFile("../FRONTEND/Index.ejs");
    res.send("Index");
})

app.get('/home',(req,res)=>{

})

app.listen(port,()=>{
    console.log("Práctica 3 corriendo en el puerto: "+port);

});