let url="https://api.npoint.io/65c25a60c9b8931a5050";
let datos={var1: "Hola", var2: "Mundo"};

/*
function guardarEnJSON(datos,urlJSON){
    let xhr= new XMLHttpRequest();
    xhr.open('POST', urlJSON);
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send([JSON.stringify(datos)]);

    xhr.onload=function(){
        if(xhr.status!=200){
            alert(xhr.status+ ' : '+xhr.statusText);
        } else{
            console.log("Guaradado! ",xhr.responseText);
        }
    };

}*/

function guardarEnJSON(datos,urlJSON) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('POST', urlJSON);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud a la red
    xhr.send([JSON.stringify(datos)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
    if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
    // Ocurrió un error
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
    } else {
    console.log(xhr.responseText); // Significa que fue exitoso
    }
    };
    } 

function eje1_pt1(){
    let llamada= new XMLHttpRequest();
    llamada.open('GET', "https://jsonplaceholder.typicode.com/users");
    llamada.send();
    llamada.onload=function(){
        if(llamada.status!=200){
            alert(llamada.status+': '+llamada.statusText);
        }else{
            console.log("Usuarios: ");
            console.table(JSON.parse(llamada.responseText));
        }
    }


}


function eje1_pt2(id){
    let llamada= new XMLHttpRequest();
    llamada.open('GET', "https://jsonplaceholder.typicode.com/users/"+ id);
    llamada.send();
    llamada.onload = function (){
       if(llamada.status == 404){
        alert("usuario no encontrado");
       } else if(llamada.status!=200){
            alert(llamada.status+': '+llamada.statusText);
       } else{
        console.log("Usuario encontrado");
        let usuario=JSON.parse(llamada.responseText);
        let to_print=" <b>Usuario: </b>" + usuario.name +
                        "<br> <b>Correo: </b>"+ usuario.email;

        document.getElementById("test").innerHTML=to_print;
       }
    }

}
