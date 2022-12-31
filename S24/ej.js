let contador=0;



document.getElementById("b+").onclick=function(){
    contador++;
    console.log(contador);
}

document.getElementById("b-").onclick=function(){
    contador--;
    document.getElementsByName("mostrar").innerHTML=contador;
    console.log(contador);
}





