import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import chalk from 'chalk';

const app= express();
const port=3000;
app.use(cors({
    methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.use(express.json());
console.log(chalk.blue("Sesión 27"));

let hash=bcrypt.hashSync("Harry@12345",15);
console.log("contraseña cifrada: "+hash);
