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



function createButton(cardID){
    let elemento=document.createElement("a");
    elemento.setAttribute("class","btn btn-goevents pequeño");
    elemento.setAttribute("href",`./event.html?id=${cardID}`);
    elemento.appendChild(document.createTextNode("See more"));
    return elemento;
}

function createLabel(name){
    let elemento=document.createElement("label");
    elemento.setAttribute("class","d-flex gap-1 align-items-center");
    elemento.setAttribute("for",name);
    return elemento;
}

function createInput(name){
    let elemento=document.createElement("input");
    elemento.setAttribute("class","checkbox-category");
    elemento.setAttribute("type","checkbox");
    elemento.setAttribute("name",name);
    elemento.setAttribute("id",name);
    elemento.setAttribute("checked","true");
    return elemento;
}


/*
*
* Generadores de la card segun parametros 
*
*/ 

function generateCard(event){
    //crear div general de la tarjeta
    let divcard=creatediv("card col-2")
    //imagen de la tarjeta
    divcard.appendChild(createimg("card-img-top",event.image,event.name));
    //crear cuerpo
    let divBody=creatediv("card-body");
    //fecha
    divBody.appendChild(createtext("h6","card-title text-left",event.date));
    //titulo
    divBody.appendChild(createtext("h5","card-title text-center",event.name));
    //texto
    divBody.appendChild(createtext("p","card-text text-center",event.description));
    //pie con boton y precio div
    let divPie=creatediv("p-0 m-0 d-flex align-items-baseline justify-content-between");
    divPie.appendChild(createtext("p","pequeño precio","$"+event.price));
    //boton
    divPie.appendChild(createButton(event._id));
    //unir div de boton y precio al cuerpo
    divBody.appendChild(divPie);
    //unir cuerpo a la tarjeta
    divcard.appendChild(divBody);
    //retorna la tarjeta para unirla al document
    return divcard;
}

/*
*
*Generador de categorias: recibe una categoria (string)
*/

function generateCategoryInput(category){
    //crear label
    let label=createLabel(category);
    //agregar input al label
    label.appendChild(createInput(category));
    //agregar texto
    label.appendChild(document.createTextNode(category));
    return label;
}

function generateDOMCategories(categories,parent){
    /*agregar los hijos al div de las categorias, se hace desde el controlador porque
    deberia respetar siempre el mismo esquema*/
    categories.forEach(category => {
        parent.appendChild(generateCategoryInput(category));
    });
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
    //return data.
    return data.events;
}

function getPastEvents(fecha){
    //si son iguales va a futuro, asi que debe retornar true solo si la fecha del evento es anterior a la fecha de comparacion
    return data.events.filter((e)=>fechaMasAntigua(fecha,e.date)==e.date);
}

function getFutureEvents(fecha){
    //retorna true si la fecha del evento es igual o posterior a la fecha de comparacion
    return data.events.filter((e)=>e.date!=fechaMasAntigua(fecha,e.date));
}

/*toman un array de elementos y devuelven solo los que cumplen con un array de condiciones (con AND o con OR segun)
*condiciones es un array de funciones booleanas que reciben un evento: (e)=>booleano;
*se contruye asi: filtrarData(data.events,[(e)=>e.name=="Collectivities Party",(e)=>true,(e)=>true])
*/

function filtrarDataAND(events,condiciones){
    return events.filter(e=>condiciones.reduce((pasa,cond)=>pasa*cond(e),true));

}
function filtrarDataOR(events,condiciones){
    return events.filter(e=>condiciones.reduce((pasa,cond)=>pasa+cond(e),false));

}

/*
* 
filtrarData(data.events,[condiciones-and(como el nombre del buscador)],[condiciones-or (como categorias)])
*ejemplo:
*filtrarData(data.events,[(e)=>e.name=="Collectivities Party",(e)=>true,(e)=>true],[(e)=>e.category=="Food Fair",(e)=>false])
*/

function filtrarData(events,condicionesAND,condicionesOR){
    return events.filter(e=>condicionesAND.reduce((pasa,cond)=>pasa*cond(e),true) && condicionesOR.reduce((pasa,cond)=>pasa+cond(e),false));

}

/*filtro de nombre: busca un name que contenga la subcadena */
function findByName(events,search){
    return events.filter(e=>e.name.toLowerCase().includes(search.toLowerCase()));
}

/*Devuelve un unico evento con esa id*/
function findById(id){
    return data.events.find(e=>e._id==id);
}

/*retorna un set con todas las categorias */
function getCategories(events){
    return new Set(events.map(e=>e.category));
}

function getAllCategories(){
    return getCategories(data.events);
}

/*retorna una funcion de filtro de nombre*/
function filterByName(name){
    return (e)=>e.name.toLowerCase().includes(name.toLowerCase());
}

/*retorna una funcion de filtro de categoria*/
function filterByCategory(category){
    return (e)=>e.category==category;
}