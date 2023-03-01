let divEventos=document.getElementById("div-eventos");

data.events.forEach(event => {
    divEventos.appendChild(generateCard(event.image,event.name,event.name,event.description,"$"+event.price));
});

