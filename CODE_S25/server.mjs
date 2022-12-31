import mongoose from "mongoose";
import chalk from "chalk";
let mongoConnection= "mongodb+srv://admin:Harry@myapp.dxmsu6q.mongodb.net/MyAppDB";
let db=mongoose.connection;

db.on('connecting',()=>{
    console.log(chalk.blue('Conectando...'));
    console.log(mongoose.connection.readyState);
});

db.on('connected',()=>{
    console.log(chalk.green('Conectado correctamente!!   :D'));
    console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnection,{useNewUrlParser: true});