"use strict";


let usuarios=[];

function initData(){
    loadJSON(cbOK,cbErr);
}

//cada objeto del json se agrega al arreglo de usuarios si es que la carga de los
//datos fue exitosa
function cbOK(datos) {
    //console.table(datos);
    
    datos.forEach(element => usuarios.push(element));
    userListToHTML(usuarios);
    alert("Init data se realizo con éxito");
}

//informa que el InitData no se realizo
function cbErr() {
    alert("Hubo un error en la carga de los datos");
    //console.log("Hubo un error en la carga de los datos");
    
}

//funcion para mandar a actulizar los nuevos usuarios en el arreglo
function updateUsers(){
    guardarEnJSON(usuarios,cbOKGuardar,cbErrGuardar);
}
//Informa que los datos se guardaron en el JSON
function cbOKGuardar(){
    alert("Se guardaron los datos con éxito");
    //console.log("Se guardaron los datos con éxito");

}
//informa que no se pudieron guardar los datos en el URL de JSON
function cbErrGuardar(){
    alert("Hubo un error. NO se pudieron guardar los datos");
    //console.log("Hubo un error.NO se pudieron guardar los datos");

}
//html de como se debe de mostrar un usuario en el navegador 
function userToHTML(usuario){
    return (`<div class="container mt-3">
      
      
    <br>
    <br>
    
    <div class="media border p-3">
      <img src="${usuario.image}" alt="${usuario.nombre} ${usuario.apellidos}" class="mr-3 mt-3 rounded-circle" style="width:150px;">
      <div class="media-body">
        <h4>Nombre: ${usuario.nombre} ${usuario.apellidos} </h4>
        <p>UID: ${usuario.uid}</p>
        <p>Correo: ${usuario.email} </p>
        <p> Password: ${usuario.password}</p>
        <p>Fecha de nacimiento: ${usuario.fecha}</p>
        <p>Sexo: ${usuario.sexo}</p>    
      </div>

      <div class="media-right">
        <button class="btn btn-primary" ><i class="fa fa-search"></i></button>
        <br>
        <button class="btn btn-primary"><i class="fa fa-pencil"></i></button>
        <br>
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalBorarrUsuario1">
          <i class="fa fa-trash"></i>
        </button>

      </div>

      <!---->
      
      <!---->
    </div>
  </div>`);

}

//por cada usuario del arreglo, lo manda a llamar con userToHTML
function userListToHTML(arryUsuarios){
    let arrryToHTML=arryUsuarios.map(element => userToHTML(element)).join('');
    info.innerHTML=`${arrryToHTML}`

}


//genera un UID  apartir del ultimo creado, 
// es necesario que se haga un initData antes,
//ya que se basa en el uid del ultimo objeto del arreglo
function generarID(){
    return (usuarios[usuarios.length-1].uid)+1;
}

//crea un usuario
function crearUsuario(uid,nombre,apellidos,email,password,fecha,sexo,image){
    return{
        uid,
        nombre,
        apellidos,
        email,
        password,
        fecha,
        sexo,
        image
    };
}


//añade un nuevo usuario al arreglo, le genera de manera automatica
//su uid y su imagen a partir de su sexo
function addUser(nombre, apellidos, email, password,fecha,sexo){
//si encuentra un usuario con el mismo correo no lo va a aañadir 
    if(usuarios.find(element =>element.email.toUpperCase()==email.toUpperCase())){
        //console.log("No se puede añadir el usuario, los datos ya existen");
        alert("No se puede añadir el usuario, los datos ya existen");
        return;

    }

    let image;
    let uid=generarID();
    if(sexo.toUpperCase()=="H"){
        image=`https://randomuser.me/api/portraits/men/${uid}.jpg`;
    }
    else{
        image= `https://randomuser.me/api/portraits/women/${uid}.jpg`;
    }
    

    usuarios.push(crearUsuario(uid,nombre,apellidos,email,password,fecha,sexo.toUpperCase(),image));
    userListToHTML(usuarios);
    alert("Se añadio al usuario con éxito");
}


//servira para cuando quiera actualizar, eliminar 
function validarID(id){
    return (usuarios.findIndex(element => element.uid==id));
}


//actualiza los datos de un usuario
function updateUser(id,obj){
    let updateID=validarID(id);
   
    if(updateID==-1){
        alert("No existe ese id");
        //console.log("ese id no existe, no se puede actualizar");
        return;
    }

    usuarios.forEach((usu)=>{
        if(usu.uid==updateID+1){
            Object.assign(usu,obj);
        }
    });

    //actualizar usuarios
    userListToHTML(usuarios);
    alert("El usuario se actualizo con éxito!");
   
}

//elimina un usuario a partir de su uid, en caso de no existir se notifica
function deleteUser(id){
    let deleteID=validarID(id);
    //cuando no encuentra index, devuelve -1 la funcion
    if(deleteID==-1){
        alert("Ese id no existe, no se puede eliminar")
        //console.log("ese id no existe, no se puede elimianr");
        return;
    }
    usuarios.splice(deleteID,1);
    //actualizar usuarios
    userListToHTML(usuarios);
    alert("El usuario ha sido eliminado");
}

//ordena los usuarios dependiendo de la propiedad 
function sortUser(key,asc){

    let arrySort=usuarios;

    let propiedad=key.toLowerCase();

    switch(propiedad){
        case 'uid':
            if(asc==true){
                arrySort.sort(function(a,b){
                    return (a.uid)-(b.uid);
                });
            
            }else if(asc==false){
                arrySort.sort(function(a,b){
                    return (b.uid)-(a.uid);
                });
            }
            break;
        case 'nombre':
            if(asc==true){
                arrySort = arrySort.sort((a, b) => {
                    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
                      return -1;
                    }
                  });
                
            }else{
                arrySort = arrySort.sort((a, b) => {
                    if (b.nombre.toLowerCase() < a.nombre.toLowerCase()) {
                      return -1;
                    }
                  }); 
            }
      
            break;
        case 'apellidos':
            if(asc==true){
                arrySort = arrySort.sort((a, b) => {
                    if (a.apellidos.toLowerCase() < b.apellidos.toLowerCase()) {
                      return -1;
                    }
                  });
                
            }else{
                arrySort = arrySort.sort((a, b) => {
                    if (b.apellidos.toLowerCase() < a.apellidos.toLowerCase()) {
                      return -1;
                    }
                  }); 
            }
            break;
        case 'email':
            if(asc==true){
                arrySort = arrySort.sort((a, b) => {
                    if (a.email.toLowerCase() < b.email.toLowerCase()) {
                      return -1;
                    }
                  });
                
            }else{
                arrySort = arrySort.sort((a, b) => {
                    if (b.email.toLowerCase() < a.email.toLowerCase()) {
                      return -1;
                    }
                  }); 
            }
            break;
        case 'password':
            if(asc==true){
                arrySort = arrySort.sort((a, b) => {
                    if (a.password < b.password) {
                      return -1;
                    }
                  });
                
            }else{

                arrySort = arrySort.sort((a, b) => {
                    if (b.password < a.password) {
                      return -1;
                    }
                  }); 
            }
            break;
        case 'fecha':
            if(asc==true){
                arrySort = arrySort.sort((a, b) => {
                    if (a.fecha < b.fecha) {
                      return -1;
                    }
                  });
                
            }else{
                arrySort = arrySort.sort((a, b) => {
                    if (b.fecha < a.fecha) {
                      return -1;
                    }
                  }); 
            }
            break;
        case 'sexo':
            if(asc==true){
                arrySort = arrySort.sort((a, b) => {
                    if (a.sexo < b.sexo) {
                      return -1;
                    }
                  });
                
            }else{
                arrySort = arrySort.sort((a, b) => {
                    if (b.sexo < a.sexo) {
                      return -1;
                    }
                  }); 
            }
            break;
        default:
            console.log("La propiedad no existe");
    }
   
    userListToHTML(arrySort);
}

function findUsers(nombre, email, sexo){
    let filtro=[];
    if(typeof nombre!='undefined'){
        usuarios.forEach((usu)=>{
            if(usu.nombre.toLowerCase().includes(nombre) ||
               usu.apellidos.toLowerCase().includes(nombre) ){
                filtro.push(usu);
            }
        });
    }

    if(typeof email!='undefined'){
        usuarios.forEach((usu)=>{
            if(usu.email.toLowerCase().includes(email.toLowerCase())){  
                filtro.push(usu);
            }
        });

    }

    if(typeof sexo !='undefined'){
        usuarios.forEach((usu)=>{
            if(usu.sexo==sexo){          
                    filtro.push(usu);
            }
        });
      
    }

    //como hay usuarios que pueden cumplir varias condicoones
    //al momento de mostralos en el div salian dupliacados
    //es por ello que los pase  a un set
    let sinDuplicados=[...new Set(filtro)];
    userListToHTML(sinDuplicados);

}