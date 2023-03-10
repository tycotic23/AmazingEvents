function search(event){
    event.preventDefault();
    //borrar las cards
    while (divEventos.firstChild){
        divEventos.removeChild(divEventos.firstChild);
      };
      //traer las nuevas cards filtradas
      filtrarData(eventosFuturos,[filterByName(barraBusqueda.value)],checkCategory()).forEach(event => {
        divEventos.appendChild(generateCard(event));
    });
}

function checkCategory(){
    let presionadas=[];
    let categories = document.getElementsByClassName("checkbox-category");
    for (category of categories){
        if(category.checked)
            presionadas=presionadas.concat(category);
    }
    return presionadas.map(category=>filterByCategory(category.name));
}

//obtener div con los eventos
let divEventos=document.getElementById("div-eventos");

//eventos futuros
let eventosFuturos=getFutureEvents(data.currentDate);

//traer todos los eventos futuros
eventosFuturos.forEach(event => {
    divEventos.appendChild(generateCard(event));
});

//obtener boton de buscar y darle evento al hacer click
let btnSearch=document.getElementById("search");
let barraBusqueda=document.getElementById("busq");
btnSearch.addEventListener('click',search);

//obtener el div de las categories y generarlas
let categoriesBar=document.getElementById("categories");
generateDOMCategories(getCategories(eventosFuturos),categoriesBar);