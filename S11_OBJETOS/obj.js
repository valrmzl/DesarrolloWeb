let obj1= new Object(); //usnado constructor
let obj2 = {}; //usando sintaxis de objeto literal

//declarando las propiedades del pbjeto :
let alumno1={
    nombre:"Pepito",
    carrea:"ISC",
    "apellido paterno": "Camela, jeje"
}


console.log(alumno1);

//acceder a la información de obejtos 
console.log(alumno1.nombre);
console.log(alumno1["nombre"]);
console.log(alumno1["apellido paterno"]);
//alumno1.promedio=9.0;
//consosle.log(alumno1.promedio);
//si una propiedad no existe te aparece como undefined
delete alumno1.carrea;
console.log(alumno1.carrea);
let app_variable="apellido paterno";
alumno1[app_variable]="López";
console.log(alumno1["apelldio paterno"]);

//funcion generadora
function crearAlumno(nombre, carrera){
    return{
        nombre,
        carrera
    }
}

let alumno_creado1=crearAlumno("Val","ISC");


//CONSTRUCTORES Y CLASES

//comon funcion:

function Alumno(nombre, carrera){
    this.nombre=nombre;
    this.carrea=carrera;
}

let alu_const1=new Alumno("Yeya","ISC");

//como clase

//la ventaja de hacerlo como clase es que depues le puedes meter más cosas

class AlumnoC{
    constructor(nombre, carrera){
        nombre,
        carrera
    }
}

let alu_const2= new AlumnoC("Maria","ISC");


//ejercicio de celulares

function crearCelular(marca, modelo, ano, precio, venta){
    return{
        marca, modelo, ano, precio, venta
    }
} 

function nuevoCeluar(marca, modelo, ano, precio, venta){
    marca, 
    modelo, 
    ano,
    precio, 
    venta    
}
//funcion generadora
class Celular{
    constructor(marca, modelo, ano, precio, venta){
        this.marca=marca;
        this.modelo=modelo;
        this.ano=ano;
        this.precio=precio;
        this.venta=venta
    }
   
}

let celular1= new Celular("Iphone","12 pro max",2021,"10000.99",true);
console.log(celular1);
console.log(celular1.marca);
console.log(celular1.modelo);
console.log(celular1.ano);
console.log(celular1.precio);
console.log(celular1.venta);


//determinar si existe propiedad

if(alumno1.expediente === undefined){
    console.log("el alumno no tiene la propiedad");

}

if(!("expediente" in alumno1)){
    console.log("el alumno no tiene la propiedad");
}

//recorrer las propiedas
for(let key in alumno1){
    console.log(key,": ",alumno1[key]);
}


//manipulando objetos 
let alumno3=alumno1;
alumno3.semestre=6;
console.log(alumno1.semestre);
console.log(alumno3==alumno1);
console.log(alumno3===alumno1);
let alumno4={};
let alumno5={};
console.log(alumno4==alumno5);
console.log(alumno4===alumno5);

let alumno6={};
Object.assign(alumno6,alumno1);//lo copia pero son independinetes, direcciones de memoria diferentes

console.log(alumno6);


console.log("****")
//funcion que muestre todas las propiedades de un objeto celular que reciba
let celVal= new Celular("Iphone","11 morado",2021,"10000.99",false);
function propiedadesCel(cel){
    for(let key in cel){
        console.log(key,": ",cel[key]);
    }

}

propiedadesCel(celVal);
//funcion que reciba un objeto de celuar y una propiedad y que determine si tiene esa 
//propiedad, si la tiene que la muestre, y si no que lo indique
function propiedadCelular(cel,pro){
    if(pro in cel){
        

    }else{
        console.log("No se tiene la propiedad")
    }
 
}

propiedadCelular(celVal,celVal.precio);