//valores por defecto a parámteros
/* se pueden poner valores por defecto a los parametros de las fucniones*/
function fun_1(variable_1=5){
    return variable_1+3;

}

let resultado=fun_1();
console.log("Resultado: ",resultado);


//prueba de scope
//se pueden delcrara variables con let
/* fuera de una función, y usar en esa función
si dicha función esta en el mismo scope de la declaración
*/ 

//var no depende del scope 
let v3=3;
function fun_2(v1=1,v2=1){
    return v1+v2+v3;
}

console.log("resultado de la función 2: ", fun_2());


/**funciones como variables
 * 
 * una funcion se puede almacenar como variable y ser ejecutada:
 */

function showMessage(message){
    console.log("estamos en la funcion. message");
}

let var_mensaje=showMessage;
var_mensaje("Hola pitaya!"); //ejecuta la funcion
console.log(var_mensaje); //muestra el códido de la funcion
console.log(typeof var_mensaje); "function"

//de otra forma
let var_mensaje_2=function showMessage_2(message){
    console.log(message);
}

var_mensaje_2("hola fresa!");

//callback y funciones anónimas
//una funcion puede ser pasada como argumento de otra funcion
//una funcion sin nomnre es una funcion anonima

//callback
function createNewUser(id, user_name, storeData){
    if(id > 0 && id < 1000){
        storedData(id, user_name);
    }
    else{
        console.log("Id incorrecto");
    }
}

function store(id, name){
    console.log("Guardado: \nID: ",id,"\nUsuario: ",name);
}

createNewUser(25,'Dorx 1',store);
createNewUser(1001,"Dorx 2", store);

//funcion anonima 