let divEventos=document.getElementById("div-eventos");

//divEventos.innerHTML("asdasdas");
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
    elemento.appendChild(document.createTextNode("Ver evento"));
    return elemento;
}


function generateCard(){
    //crear div general de la tarjeta
    let divcard=creatediv("card col-2")
    //imagen de la tarjeta
    divcard.appendChild(createimg("card-img-top","assets/img/Costume_Party.jpg","evento1"));
    //crear cuerpo
    let divBody=creatediv("card-body");
    //titulo
    divBody.appendChild(createtext("h5","card-title text-center","Título"));
    //texto
    divBody.appendChild(createtext("p","card-text text-center","Texto descriptivo"));
    //pie con boton y precio div
    let divPie=creatediv("p-0 m-0 d-flex align-items-baseline justify-content-between");
    //precio **luego crear una funcion especial para crear precio que le anexe <span>Price:</span> antes (o puede ser desde css)
    divPie.appendChild(createtext("p","pequeño","<span>Price:</span> $21287"));
    //boton
    divPie.appendChild(createButton());
    //unir div de boton y precio al cuerpo
    divBody.appendChild(divPie);
    //unir cuerpo a la tarjeta
    divcard.appendChild(divBody);
    //returna la tarjeta para unirla al document
    return divcard;
}

divEventos.appendChild(generateCard());
divEventos.appendChild(generateCard());
divEventos.appendChild(generateCard());

/******** FALTA: 
 * 
 * en css la clase precio que le agrege <span>Price:</span> antes
 * funcion que recorre el array en data y genere una tarjeta por cada dato dentro
 * que la funcion anterior pase los parametros de cada evento al generador de tarjetas
 * pasar esto a una clase para no repetir en cada js
 * 
 * 
*/