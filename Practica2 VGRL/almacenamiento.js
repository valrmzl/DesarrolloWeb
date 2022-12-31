"use strict";

let url="https://api.npoint.io/2a1d15cdfc2b28a4b744";

function loadJSON(cbOk,cbErr) {
 
    // 1. Crear XMLHttpRequest object
    
    let xhr = new XMLHttpRequest();
    
    // 2. Configurar: PUT actualizar archivo
    
    xhr.open('GET', url);
    
    // 4. Enviar solicitud
    
    xhr.send();
    
    // 5. Una vez recibida la respuesta del servidor
    
    xhr.onload = function () {
    
    if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
    
    // Ocurrió un error
    
    alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
    
    // ejecutar algo si error
    cbErr();
    
    } else {
    
    let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
    
    // Ejecutar algo si todo está correcto
    cbOk(datos);
    
    console.log(datos); // Significa que fue exitoso
    console.table(datos);
    
    }
    
    };
    
}

function guardarEnJSON(datos,cbOKGuardar,cbErrGuardar){
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST', url);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud al servidor
    xhr.send([JSON.stringify(datos)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP 
            // Ocurrió un error
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            //funcion de callback de error
            cbErrGuardar();
            
        } else {
            console.log(xhr.responseText); // Significa que fue exitoso
            //funcion de callback de exito
            cbOKGuardar();
        }
    };

}


