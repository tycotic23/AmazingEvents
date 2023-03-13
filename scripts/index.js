let divEventos=document.getElementById("div-eventos");




getAllEvents().forEach(event => {
    divEventos.appendChild(generateCard(event.image,event.name,event.name,event.description,"$"+event.price));
});




