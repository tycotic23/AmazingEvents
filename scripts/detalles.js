//conseguir el parametro id desde la url
const queryString=location.search;
const params=new URLSearchParams(queryString);
let id=params.get("id");

let data;
//obtener datos
fetch("https://mindhub-xj03.onrender.com/api/amazing").then(datos=>datos.json()).then(
    api=>{
        data=api;
        ManipularEvents();
    });

//boton para volver
let btnVolver=document.getElementById("volver");
btnVolver.addEventListener("click",()=>{window.history.back()});


function ManipularEvents(){
    //conseguir evento en cuestion
    let evento=findById(id);

    //obtener cada elemento y cambiar su contenido segun el evento
    let eventName=document.getElementById("name");
    eventName.textContent=evento.name;

    let description=document.getElementById("description");
    description.textContent=evento.description;

    let category=document.getElementById("category");
    category.textContent=evento.category+'/';

    let date=document.getElementById("date");
    date.textContent=evento.date;

    let price=document.getElementById("price");
    price.textContent=evento.price;

    let capacity=document.getElementById("capacity");
    capacity.textContent=evento.capacity;

    let image=document.getElementById("image");
    image.src=evento.image;

    //algunos eventos tienen assitance y otros estimate
    let estimate=document.getElementById("estimate");
    if(evento.hasOwnProperty("estimate")){
        estimate.textContent=evento.estimate;
        document.getElementById("change-title").textContent="Estimate";
    }
    else{
        estimate.textContent=evento.assistance;
    }
}

