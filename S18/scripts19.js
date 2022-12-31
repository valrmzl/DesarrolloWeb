function readUsers(con_auth){
    let url="http://localhost:3000/usuarios"
    let xhr= new XMLHttpRequest();
    xhr.open('GET', url);
    if(con_auth){
        xhr.setRequestHeader('x-auth','PASS123');
    }
    xhr.send();
    xhr.onload=function(){
        if(xhr.status!=200){
            alert(xhr.status+': '+xhr.statusText);
        }else{
            console.log("Usuarios: ");
            console.log(xhr.response);
         
            console.table(JSON.parse(xhr.response));
            alert("Se leyeron los usuarios");
        }
    }
}