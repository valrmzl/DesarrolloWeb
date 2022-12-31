//realizar estsos ejercicios
//con callback, para mi es la manera más sencilla,
// pense en otra solución similar, la cual seria en base a fors
//al final se debe de llamar a la funcion de 
//setTimeOut con el tiempo total que debe de durar
//las impreiones, es decir 10 segunods, porque son 
//1 hola cada segundo, y 5 mundos cada 2 segundos

//las condiciones de exito
/*
let flagHola=false;
let flagMundo=false;


function callbackHellHola () {
    for(let i=0;i<10;i++){
        setTimeout(function hola(){
            console.log("Hola ",i+1);
        }, i*1000);
    }
    flagHola=true;   
}

function callbackHellMundo () {
    for(let i=0;i<5;i++){
        setTimeout(function Mundo(){
            console.log("Mundo ",i+1);
        }, i*2000);
    }
    flagMundo=true;   
}
// LO MISMO PARA callbackhellMundo()

function ifEnd () {
    if(flagHola && flagMundo) {
        console.log("FIN");
    } else{
        setTimeout(ifEnd,100);        
    }
}
 
callbackHellHola();
callbackHellMundo();
setTimeout(ifEnd,10000);
*/

/*
//con promises
function printHola(value) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("Hola " + value);
            resolve(value + 1);
        }, 1000);
    });
}

function printMundo(value) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log("Mundo " + value);
            resolve(value + 1);
        }, 2000);
    });
}
 
// encadenar promesas
//manda a llamar la funcion de printHola con valor de 1,
//en los casos de exito lo va imrimiendo y a sy vez aumenta el 
//valor del value si se sigue cumpliendo con la proemsa
//acumula las veces que sean necesario, en este caso 10
//hasta resolverlo por compelto
//se devuleve una promesa por cada then
let pH = printHola(1)
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(result => printHola(result))
    .then(() => Promise.resolve());

// Lo mismo para printMundo
//puesto que tienen la misma acción , solo que
// esta debe de ser ejecutada cada 2 seg, 5 veces
//en total
let pM = printMundo(1)
.then(result => printMundo(result))
.then(result => printMundo(result))
.then(result => printMundo(result))
.then(result => printMundo(result))
.then(() => Promise.resolve());

//al ver que la promesa ya se cumplio, solo queda
//resolverla 
pH.then(() => pM)
	.then(() => console.log("FIN"))

*/


//funcion que nos servira
//para controlar el tiempo de las impreisiones
function delay(ms) {
    return new Promise(function (resolve) {
        setTimeout(() => resolve(), ms);
    });
}
//despues de entender este código
//me parece que es el segundo más sencillo de 
//comprender

async function printHola(){
    for(let i=0; i<10; i++){
        //que sea cada segundo
        let response = await delay(1000);
         console.log("Hola ",i+1);
    }
    //al llamar al resolve, 
    //hace que ya no nos tengamos que prepucpar 
    //por llevar el incremento del tiempo
    return Promise.resolve(); 
}

async function printMundo(){
    for(let i=0; i<5; i++){
        //cada 2 segundos
        let response = await delay(2000);
         console.log("Mundo ",i+1);
    }
    return Promise.resolve();
}

//la forma en como ejecuta 2 fucniones a la vez me parece bastante 
//ineteresnate
//cada una lleva sus await correspodnientes
//y hasta que no se acaban amosb tiempos
//se hace la impresión de FIN
async function tareaFin(){
    await Promise.all([printHola(), printMundo()] );
    console.log("FIN");
}
//La mejor parte es que se llama la función final
//de una manera super sencilla

tareaFin();




