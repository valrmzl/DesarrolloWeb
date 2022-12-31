function changeDeepestDiv(reemplazo){
    //entra al ultimo div y cambia el string que ya estaba por el que sea
    let vidActual=document.body.firstElementChild;
    while(vidActual!=document.body.lastElementChild){
        vidActual=document.body.nextElementSibling;
    }
    vidActual=div.innerHTML = `<span style="background-color: lime">Replacement HTML</span>`;
}