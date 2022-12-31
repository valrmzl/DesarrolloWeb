import express from "express";
import chalk from "chalk";
import cors from 'cors';
import * as fs from "node:fs";
import asciiCats from "ascii-cats";

const app = express();
const port = 3000;
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
    }
));

//SESION DEL LUNES 17 DE OCTUBRE
//INSTALACION DE CORS

function print_cat(req, res, next){
    console.log(asciiCats());
    next();
}

app.use(print_cat);
//middleware
function print_middleware(req, res, next){
    console.log(chalk.blue("Método: ")+chalk.green(req.method));
    console.log(chalk.blue("URL: ")+chalk.green(req.originalUrl));
    console.log(chalk.blue("Fecha: ")+chalk.green(new Date(Date.now().toString)));
    console.log(chalk.blue("Content-type: ")+chalk.green(req.method));
    next();


}
app.use(print_cat);
app.use("/usuarios",print_middleware);


app.get("/", (req, res) => {
    res.send("Raiz del sitio");
    console.log(chalk.blue("Entró a la raiz"));
});

app.get("/home", (req, res) => {
    res.send("Home del sitio");
    console.log(chalk.green("Entró a home"));
});
app.get("/usuarios", (req, res) => {
    let auth= req.get('x-auth');
    if(auth){
        fs.readFile('./usuarios.json','utf8',function(error,data){
            if(error){
                console.log("error");
            }
            console.log(chalk.blue("Mostrando usuarios: "));
            console.table(JSON.parse(data));
            res.send(data);
        })

    }
    else{
        console.log(chalk.red("No autorizado"));
        res.sendStatus(401);
    }

});
/*
app.get("/usuarios", (req, res) => {
    let fileReadedCb = (error, data) => {
        if (error) {
            console.log(error);
        }
        else{
            console.log(chalk.green("Usuarios encontrados"));
            console.log(data);
            console.table(JSON.parse(data));
            res.send("Usuarios mostrados en consola!");

        }
    };

    console.log(chalk.yellow("Mostrando usuarios"));
    fs.readFile("./usuarios.json", "utf8", fileReadedCb);
});*/


app.listen(port, () => {
    console.log("Aplicación ejemplo corriendo en puerto " + port);
});



