

let url="https://jsonplaceholder.typicode.com/users"
function readJSON(url){
    let xhr= new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.send();
    xhr.onload=()=>{
        if(xhr.status!=200){
            alert(chr.status+": "+xhr.statusText);

        }else{
            console.log(xhr.responseText)
        }
    }
}

readJSON(url);

function readJSONbyID(url,ID){
    let xhr= new XMLHttpRequest();
    xhr.open('GET', `${url}/${ID}`);
    xhr.send();
    xhr.onload=()=>{
        if(xhr.status!=200){
            alert('NO EXISTE ESE ID');

        }else{
            console.log(xhr.responseText)
        }
    }
}


readJSONbyID(url,10);
readJSONbyID(url,100);