function getInfo(elemento, atributo){
    console.log("Id: "+elemento.id);
    console.log(elemento.attributes);
    console.log("Existe "+atributo+ "?");
    console.log(elemento.hasAttribute(atributo));
   

}

function hola(){
    console.log("hola");
}

function setInfo(elemento, atributo, valor){
    elemento.setAttribute(atributo,valor);
    console.log("Se agrgeo el atributo");
    console.log(elemento);

}