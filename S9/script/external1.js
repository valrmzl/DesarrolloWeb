//alert("soy una alerta de afuera")

//del¿claración de variable
var x='test';
let y=5;

//esto es una constante
const z=y+5;

//impresion en consola
console.log("Z vale: ",z);

//esto genera error porque es constante
//z=7

//numeros
let n1=3;
let n2=3.14;

//cadenas de texto
let str1="cadena 1";
let str2="cadena 2";
let str3="cadena 3"+n1;

//booleanos
let bol1=true;
let bol2=false;

//arreglos
let arry1 =[1,"texto","otro",true,["subvalue",false]]

let value_arry=arry1[4][1];
//outputs de tipos de datos
console.log("Ejemplo de array: ",value_arry);
console.log("ejemplo de numeros: ",n2,typeof(n2));
console.log("ejemplo de str: ",str1,typeof(str1));

let prom1=[3,4,5,6];

//funciones
function promedio(array){
    let suma=0;
  
    for(let i=0;i<array.length;i++){
        suma+=array[i];
    }
    return suma/array.length;

}

console.log(promedio(prom1));