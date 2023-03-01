/*
*
* Generadores de objetos html
*
*/ 

function createtext(etiqueta,clase,texto){
    let elemento=document.createElement(etiqueta);
    elemento.setAttribute("class",clase);
    elemento.appendChild(document.createTextNode(texto));
    return elemento;
}

function creatediv(clase){
    let elemento=document.createElement("div");
    elemento.setAttribute("class",clase);
    return elemento;
} 

function createimg(clase, src, alt){
    let elemento=document.createElement("img");
    elemento.setAttribute("class",clase);
    elemento.setAttribute("src",src);
    elemento.setAttribute("alt",alt);
    return elemento;
}



function createButton(){
    let elemento=document.createElement("a");
    elemento.setAttribute("class","btn btn-goevents pequeño");
    elemento.setAttribute("href","./event.html");
    elemento.appendChild(document.createTextNode("See event"));
    return elemento;
}


/*
*
* Generadores de la card segun parametros 
*
*/ 

function generateCard(imgUrl, imgAlt,titulo,descripcion,precio){
    //crear div general de la tarjeta
    let divcard=creatediv("card col-2")
    //imagen de la tarjeta
    divcard.appendChild(createimg("card-img-top",imgUrl,imgAlt));
    //crear cuerpo
    let divBody=creatediv("card-body");
    //titulo
    divBody.appendChild(createtext("h5","card-title text-center",titulo));
    //texto
    divBody.appendChild(createtext("p","card-text text-center",descripcion));
    //pie con boton y precio div
    let divPie=creatediv("p-0 m-0 d-flex align-items-baseline justify-content-between");
    divPie.appendChild(createtext("p","pequeño precio",precio));
    //boton
    divPie.appendChild(createButton());
    //unir div de boton y precio al cuerpo
    divBody.appendChild(divPie);
    //unir cuerpo a la tarjeta
    divcard.appendChild(divBody);
    //retorna la tarjeta para unirla al document
    return divcard;
}

/*
*
* operaciones entre fechas (podrian ir en otro script pero no queria seguir sumando scripts para agregar en el html)
*
*/ 

function fechaMasAntigua(fecha1,fecha2){
    //pasar fechas a arrays
    let f1=fecha1.split("-");
    let f2=fecha2.split("-");
    //comparando años, si f1 es mas actual
    if(f1[0]>f2[0]) return fecha2;
    if (f1[0]<f2[0]) return fecha1;
    //si llego hasta aca es porque los años coinciden
    //comparando meses
    if(f1[1]>f2[1]) return fecha2;
    if (f1[1]<f2[1]) return fecha1;
    //si llego hasta aca es porque los meses coinciden
    //comparando dias
    if(f1[2]>f2[2]) return fecha2;
    if (f1[2]<f2[2]) return fecha1;
    //en este caso coinciden
    return "coinciden";
}

/*
*
* manipulando data.js
*
*/ 

function getAllEvents(){
    return data.events;
}

function getPastEvents(fecha){
    return data.events.filter(
        function(event){
            //va a ser igual a la mas antigua de las fechas
            let masAntigua=fechaMasAntigua(fecha,event.date);
            //si son iguales va a futuro, asi que debe retornar true solo si la fecha del evento es anterior a la fecha de comparacion
            return masAntigua==event.date;
        }
    );
}

function getFutureEvents(fecha){
    return data.events.filter(
        function(event){
            //va a ser igual a la mas antigua de las fechas
            let masAntigua=fechaMasAntigua(fecha,event.date);
            //retorna true si la fecha del evento es igual o posterior a la fecha de comparacion
            return masAntigua!=event.date;
        }
    );
}