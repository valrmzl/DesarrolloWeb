/*
console.log("uno");
setTimeout(function timeout(){
    console.log("A");
}, 7000);

setTimeout(function timeout(){
    console.log("B");
}, 0);
setTimeout(function timeout(){
    console.log("C");
}, 2000);
setTimeout(function timeout(){
    console.log("D");
}, 1000);
console.log("end");*/

//mostrar mensaje de hola con tiempo de 1 seg

/*
for(let i=0;i<5;i++){
    setTimeout(function timeout(){
        console.log("Hola");
    }, 1000*(i+1));
}

for(let i=0;i<4;i++){
    setTimeout(function timeout(){
        console.log("Mundo");
    }, 1000*(i+1));
}*/


//Ejemplo de promesa
//segudno parametro es de cuando no se arma

/*
let promesa1= new Promise(function( resolve, func_reject){
    setTimeout(()=>{
        if(Math.random()<0.5){
            console.log("Procesando la promesa");
            resolve("Correcto!");
        }
        else{
            func_reject(new Error("Algo fallo"));
        }
    },1000)
});

promesa1.then(function exito(result){
    console.log(result);
}, function rechazo(error){
    console.log(error);
});*/

function loadScript(src){
    return new Promise(function (resolve, reject){
        let script = document.createElement('script');
        script.src=src;
        script.onload= ()=> resolve(script);
        script.onerror = () => reject(new Error("Script load error: "+src));
        document.head.append(script);
    });
}

let promesa2= loadScript("https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y");
promesa2.then(
    script=> alert(script.src+"cargada!"),
    error=> alert("Error!: "+error.message)
);
promesa2.then(script =>alert("algo extra por hacer!"));