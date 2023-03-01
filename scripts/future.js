let divEventos=document.getElementById("div-eventos");

getFutureEvents(data.currentDate).forEach(event => {
    divEventos.appendChild(generateCard(event.image,event.name,event.name,event.description,"$"+event.price));
});

