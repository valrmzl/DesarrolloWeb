let libros=[];


for (let i = 0; i <10; i++) {
    let libro={
        id:i,
        autor:"Author "+ Math.floor(Math.random()*100),
        anio: Math.floor(Math.random()*20)+2000,
        fecha: ''
    }
    libro.fecha=new Date(libro.anio+"-01-01t12:00:00.000Z");
    libros.push(libro);
    
  }
console.table(libros);

console.log("Arry de libros en JSON: ",JSON.stringify(libros));

//añadir neuvo libro 
let new_libro={
    id : 11,
    autor: "Autor libro nuevo ",
    anio: 2022,
    fecha: new Date()
}

//añadirlo al inicio
libros.unshift(new_libro);
console.table(libros);

let libros_new=[];
function invertir_orden(nuevo, viejo){
    let tamanio=viejo.length
    for(let i=0;i<tamanio;i++){
        nuevo.push(viejo.pop());
    }
    return nuevo;
}

libros_new=invertir_orden(libros_new,libros);

console.table(libros_new);
//arreglo que se creo primero ahora esta vacio
console.log(libros);

//EJERCICIO 3
//creacion de copia del arreglo de lbros
let libros_copy=libros_new;
//funcion que recibe id y arreglo, en ese elimina el id especifico
function elimianr_libro(id,arry){
    let indice=arry.findIndex(item=> item.id==id);
    if(indice!=-1){
        delete arry[indice];
        console.log("Elemento: ",id," eliminado");
        return true
    }else{
        console.log("Elemento: ",id," no encontrado");
        return false;
        
    }
}

elimianr_libro(4,libros_copy);
console.log("Libors copy con un libro eliminado: ");
console.table(libros_copy);
//funcion que recibe un año y arreglo de libros
//regrese los libros de igual o menor año
//impresión con console.table
function libros_anio(anio,arry){
    return arry.filter(item=>item.anio<=anio);
}

let libros_filtrados= libros_anio(2013,libros_copy);
console.table(libros_filtrados);


//  T A R E A     0 4     E J E R C I C I O S    D E     A R R E G L O S


// 1.- Creacion de arreglo con 20 libros
let libros_tarea=[];
for(let i=0;i<20;i++){
    let libro={
        id:i,
        autor:"Author "+ Math.floor(Math.random()*100),
        anio: Math.floor(Math.random()*20)+2000,
        fecha: '',
        clave: Math.floor((Math.random() * (999 - 100 + 1)) + 100),
        num_palabras: Math.floor((Math.random() * (100000 - 1000 + 1)) + 1000)
    }
    libro.fecha=new Date(libro.anio+"-01-01t12:00:00.000Z");
    libros_tarea.push(libro);

}

console.table(libros_tarea);

//crear libro que sea añadido en la posicion 7
let libro_pos7={
    id:12345,
    autor:"Author "+ Math.floor(Math.random()*100),
    anio: Math.floor(Math.random()*20)+2000,
    fecha: '',
    clave: Math.floor((Math.random() * (999 - 100 + 1)) + 100),
    num_palabras: Math.floor((Math.random() * (100000 - 1000 + 1)) + 1000)
}
libro_pos7.fecha=new Date(libro_pos7.anio+"-01-01t12:00:00.000Z");

libros_tarea.splice(6,0,libro_pos7);

console.table(libros_tarea);

//ordenacion de los libros por medio de sort y compare
libros_tarea.sort((a,b)=>{
    if(a.clave<b.clave){
        return -1;
    }

    if(a.clave>b.clave){
        return 1;
    }
    return 0;

});
console.table(libros_tarea);

//funcion de total/promedio/max/min
function opciones(arry,op){
    let total;
    switch(op) {
        case "TOT":
          total=0;
          for(let i=0;i<arry.length;i++){
            total=total+arry[i].num_palabras;
          }
          console.log("La suma total de palabras en los libros es: ",total);
          break;
        case "PRO":
            total=0;

            for(let i=0;i<arry.length;i++){
              total=total+arry[i].num_palabras;
            }
            console.log("El promedio de num de palabras en los libros es: ",(total/arry.length).toFixed(2));
          // code block
          break;
        case "MAX":
            let max=arry[0].num_palabras;
            let clave_max=arry[0].clave;
            for(let i=0;i<arry.length;i++){
                if(arry[i].num_palabras>max){
                    max=arry[i].num_palabras;
                    clave_max=arry[i].clave;
                }

            }
            console.log("La clave del libro que tiene más palabras es: ",clave_max,"con ",max," palabras");
            break;
        case "MIN":
            let min=arry[0].num_palabras;
            let clave_min=arry[0].clave;
            for(let i=0;i<arry.length;i++){
                if(arry[i].num_palabras<min){
                    min=arry[i].num_palabras;
                    clave_min=arry[i].clave;
                }

            }
            console.log("La clave del libro que tiene menos palabras es: ",clave_min,"con ",min," palabras");
            break;
        default:
          console.log("Esa no es una opcion válida");
      }

}


opciones(libros_tarea,"TOT");
opciones(libros_tarea,"PRO");
opciones(libros_tarea,"MAX");
opciones(libros_tarea,"MIN");