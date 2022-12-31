import chalk from 'chalk';
import asciicats from 'ascii-cats';



console.log(chalk.bgBlue.underline("SPECS:                             "));
console.log(chalk.bold("CPU Usage: ")+chalk.red.underline("99%"));
console.log(chalk.bold("RAM Usage: ")+chalk.yellow.underline("99%"));
console.log(chalk.bold("Disk Usage: ")+chalk.green.underline("99%"));

console.log(asciicats());


//archivos
//ejemplo de lectura de archivos
import * as fs from 'node:fs';
//defimcion de calbback
let fileReadedCb = function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
    console.table(JSON.parse(data));
}

//fs.readFile('./files/testfile','utf8',fileReadedCb);
fs.readFile('./usuarios.json','utf8',fileReadedCb);
