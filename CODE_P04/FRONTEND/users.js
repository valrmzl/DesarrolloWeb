//import { createHash } from "node:crypto";

var detallesGlobal={};

function RegistrarUsuario(){
    //alert("registrando usuario");
    let usuario={};
    //mandamos nombre
    if(document.getElementById("NombreRegistro").value!="" && document.getElementById("ApellidoRegistro").value!=""){
        usuario.nombreC=document.getElementById("NombreRegistro").value+" "+document.getElementById("ApellidoRegistro").value;
    }
    //verificando correo
    if(document.getElementById("CorreoRegistro").value!=""){
        usuario.correo=document.getElementById("CorreoRegistro").value;
    }

    //que las contraseñas coincidan
    let password=document.getElementById("PasswordRegistro").value;
    let confirm=document.getElementById("ConfirmPasswordRegistro").value;
    if(password != confirm){
        alert("Las contraseñas no coinciden");
        return;
    } 
    usuario.password=password;
    //fecha
    if(document.getElementById("FechaRegistro").value!=undefined){
        usuario.fecha=document.getElementById("FechaRegistro").value;
    }

    //sexo
    let sexo;
    if(document.getElementById("HombreRegistro").checked){
        sexo=document.getElementById("HombreRegistro").value;
        //console.log(sexo);
        usuario.sexo=sexo;
    }else if(document.getElementById("MujerRegistro").checked){
        sexo=document.getElementById("MujerRegistro").value;
        usuario.sexo=sexo;
    }

    //imagen
    if(document.getElementById("URLRegistro").value!=""){
        usuario.imagen=document.getElementById("URLRegistro").value;
    }
    
    console.table(usuario);

    
    let xhr =  new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/users');
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(usuario));
    xhr.onload = function () {
        console.log("si llega a los ultimos if");
        debugger;
        if (xhr.status == 400) {
            // Hicieron falta atributos en el body
                alert(xhr.status + ': Todos los campos deben de estar completados'); 
                return;
            }else if(xhr.status==404){
                alert("Ya existe un usuario registrado con ese correo");
                return;
            }else{
                console.log("deberia ir a usuaris");
                window.location.href = "Usuarios.html";

            }
            window.location.href = "Usuarios.html";
        debugger;
        
        
    }
}

function login() {
    //alert("se quiere inicia sesion");
    console.log("diste click en login");
    debugger;

    // Guardar values de los inputs de modal de login
    let correo = document.getElementById("LoginCorreo").value;
    let password = document.getElementById("LoginPassword").value;
    
    if(correo == "" || password == ""){
        alert("No puedes dejar campos vacíos");
    } else {
     
        // Llamar POST /api/login de backend
        let userBody = {"correo": correo, "password": password};
        console.table(userBody);
        
        let xhr =  new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/login');
        xhr.setRequestHeader("content-type", "application/json");
        xhr.send(JSON.stringify(userBody));
        xhr.onload = function () {
            console.log("si llega a los ultimos if");
            debugger;
            
            if (xhr.status == 400) {
            // Hicieron falta atributos en el body
                alert(xhr.status + ': completa todos los campos'); 
            } else if (xhr.status == 401) {
            // El usuario no existe
                alert(xhr.status + ': cuenta inexistente'); 
            } else {
            // El usuario existe y la contraseña es correcta; obtener token
                let token = xhr.responseText;
                localStorage.setItem("token","5i4d9emnUG-5");
                //alert("¡Bienvenid@! T: "+localStorage.token);
                // Si el login fue exitoso, se redirige a la página de inicio
                console.log("deberia ir a usuaris");
                debugger;
                window.location.href = "Usuarios.html";
            }
        }
    }
}

function userDetallesModal(usuario){
    return (
        `
      <div class="modal fade" id="detallesUsuario">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header"  id="modal_detallles">
            <h3>Estos son los detalles del usuario</h3>
            
            
            <br>
            
            
          </div>
          <div class="media-body">
          <p>Nombre: ${usuario.nombreC}</p>
          <p>Nombre: ${usuario.correo}</p>
          <p>Nombre: ${usuario.password}</p>
          <p>Nombre: ${usuario.fecha}</p>
          <p>Nombre: ${usuario.sexo}</p>
          
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            
          </div>
          
        </div>
      </div>
    </div>
    
      <div class="modal fade" id="modalBorarrUsuario">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        
          <!-- Modal Header -->
          <div class="modal-header">
            <h3>¿Estas seguro que quieres eliminar al usuario?</h3>
          </div>
          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger"   data-dismiss="modal" id="confirmacionEliminar" >Eliminar usuario</button>
          </div>
          
        </div>
      </div>
    </div>
    
    
    
      `
    );
}
//USUARIOS
function userToHTML(usuario){
    return (`<div class="container mt-3">
    <br>
    <br>
    
    <div class="media border p-3">
    <script>
    let nombre=${usuario.nombreC};
     </script>
      <img src="${usuario.imagen}" alt="${usuario.nombreC}" class="mr-3 mt-3 rounded-circle" style="width:150px;">
      <div class="media-body">
        <h4>Nombre: ${usuario.nombreC}  </h4>
        <p>UID: ${usuario.uid}</p>
        <p>Correo: ${usuario.correo} </p>
        <p> Password: ${usuario.password}</p>
        <p>Fecha de nacimiento: ${usuario.fecha}</p>
        <p>Sexo: ${usuario.sexo}</p>    
      </div>

      <div class="media-right">
        <button class="btn btn-primary" ><i class="fa fa-search" onclick="detalles(${usuario.uid})"></i></button>
        <br>
        <button class="btn btn-primary"><i class="fa fa-pencil"></i></button>
        <br>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalBorarrUsuario" onclick="eliminarUsuario(${usuario.uid})" >
          <i class="fa fa-trash"></i>
        </button>

      </div>

      <!---->
      
      <!---->
    </div>
  </div>

  <div class="modal fade" id="modalBorarrUsuario">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
    
      <!-- Modal Header -->
      <div class="modal-header">
        <h3>¿Estas seguro que quieres eliminar al usuario?</h3>
      </div>
      <!-- Modal footer -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-danger"   data-dismiss="modal" id="confirmacionEliminar" >Eliminar usuario</button>
      </div>
      
    </div>
  </div>
</div>



  `
  );

}

//por cada usuario del arreglo, lo manda a llamar con userToHTML
function userListToHTML(arryUsuarios){
    let arrryToHTML=arryUsuarios.map(element => userToHTML(element)).join('');
    info.innerHTML=`${arrryToHTML}`
}

function traerUsuarios(){
    //alert("se deberian mostrar todos los usuarios");
    console.log("USUARIOS");
    let xhr= new XMLHttpRequest();
    xhr.open('GET','http://localhost:3000/api/users');
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    console.log("paso el url");
    console.log("aaaa");
    xhr.send();
    
    xhr.onload = function () {
        console.log("entrando");
        if(xhr.status==401){
            alert("Algo salio mal");
            return;
        }
        let usuarios=JSON.parse(xhr.responseText);
        console.log(usuarios);
        userListToHTML(usuarios);

    }
  
}


function eliminarUsuario(uid){
    //alert("eliminar");
    console.log(uid);
    seguroEliminar(uid);
}

function seguroEliminar(uid){
    let btn=document.getElementById("confirmacionEliminar");
    btn.addEventListener("click",function(){
        console.log("la confirmacion es segura")
        console.log("se va a elimianr el id: "+uid);
        let xhr= new XMLHttpRequest();
        xhr.open('DELETE','http://localhost:3000/api/users/'+uid);
        xhr.setRequestHeader("x-auth-user", localStorage.token);
        xhr.send();
        xhr.onload=function(){
            console.log("entra al load del request");
            if(xhr.status!=201){
                alert(xhr.status+": "+xhr.statusText);
                return;
            }else{
                alert("El usuario se elimino con exito!!");
                window.location.href = "Usuarios.html";
            }
            
        }


    })
    
}

function filtrarBusqueda(){
    alert("busqueda");
    let busqueda=document.getElementById("barraBusqueda").value;
    console.log("esta es la bsuqeda:");
    console.log(busqueda);
    let xhr= new XMLHttpRequest();
    xhr.open('GET',`http://localhost:3000/api/users?nombreC=${busqueda}`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-user-token", localStorage.token);
    xhr.send();
    xhr.onload = function () {
        if(xhr.status != 200){
            alert("No se pudo realizar la busqueda");
        }else {
            console.log("se supone que se hizo la bsuqedaa")
            let users = JSON.parse(xhr.response);
            console.table(users);
            userListToHTML(users);
        }
    }


}

function detalles(uid){
    console.log("se deben de ver los detalles del usuario:")
    console.log(uid);
    //despliegue del modal
    $("#modalDetallesUsuario").modal();
    let resultado=[];
    let xhr= new XMLHttpRequest();
        xhr.open('GET','http://localhost:3000/api/users/'+uid);
        xhr.setRequestHeader("x-auth-user", localStorage.token);
        xhr.send();
        xhr.onload = function () {
            console.log("entrando");
            if(xhr.status==401){
                alert("Algo salio mal");
                return;
            }
            resultado=JSON.parse(xhr.responseText);
            console.log("USUARIO:");
            console.log(resultado);
            let divDetalles=document.getElementById("detallesBody");
            divDetalles.innerHTML = modalToHTML(resultado);
       
            //detallesGlobal=usuario;
            //console.table(detallesGlobal);
            //modalDetalles(detallesGlobal);
            //userToHTML(usuario);
        }
}

function modalToHTML(obj){
    let usuario = obj;
    console.log("en la funcion de modalToHTML");
    console.log(usuario);
    
    return `
    <div class="container ">
    <br>
    <br>
    
    
    <script>
    let nombre=${usuario.nombreC};
     </script>
      <img src="${usuario.imagen}" alt="${usuario.nombreC}" class="mr-3 mt-3 rounded-circle" style="width:150px;">
      <div class="media-body">
        <h4>Nombre: ${usuario.nombreC}  </h4>
        <p>UID: ${usuario.uid}</p>
        <p>Correo: ${usuario.correo} </p>
        <p> Password: ${usuario.password}</p>
        <p>Fecha de nacimiento: ${usuario.fecha}</p>
        <p>Sexo: ${usuario.sexo}</p>    
      </div>

      

      <!---->
      
      <!---->
    
  </div>
    
    
    
    
    
    `;

}

function modalDetalles(usuario){
    let usu=usuario[0];
    return `<div>
    <div class="media">
      <div class="media-body">
          <h5 class="mt-0 mb-1">${usu.nombreC}</h5>
          <p><b>UID:</b> ${user.uid}</p>
          <p><b>email:</b> ${user.correo}</p>
          <p><b>password:</b> ${user.password}</p>
          <p><b>fecha:</b> ${user.fecha}</p>
          <p><b>sexo:</b> ${user.sexo}</p>
      </div>
      </div>`;

}
