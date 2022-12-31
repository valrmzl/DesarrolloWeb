
//TAREA 3 VALERIA GUADALUE RAMIREZ LOPEZ FUNCIONES
let calificaciones =[
    [6,8,5,5,10],
    [6,5,7,3,8],
    [5,5,8,1,4],
    [6,9,8,10,5],
    [5,8,5,7,9]
];

let fnAprobado=function (grupo, promedio){
    console.log("El grupo ",grupo," aprobo con un promedio de ", promedio);
}

let fnReprobado=function (grupo, promedio){
    console.log("El grupo ",grupo," reprobo con un promedio de ", promedio);
}

let getPromedio=function (grupo){
    let suma=0;
    for(let i=0;i<grupo.length;i++){
        suma+=grupo[i];
    }
    return suma/grupo.length;
}



function getCalificaciones(arry,fnAprobado,fnReprobado,getCalificaciones){
    for(let grupo=0;grupo<arry.length;grupo++){
        if(getPromedio(arry[grupo])>6){
            fnAprobado(grupo,getPromedio(arry[grupo]));
        }
        else{
            fnReprobado(grupo,getPromedio(arry[grupo]));
        }
    }
}

getCalificaciones(calificaciones,fnAprobado,fnReprobado);


 