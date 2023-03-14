function search(event){
    event.preventDefault();
    //borrar las cards
    while (divEventos.firstChild){
        divEventos.removeChild(divEventos.firstChild);
      };
      //traer las nuevas cards filtradas
      //filtrarData es un filtro dinamico, solo revisa las funciones que se le pasan. 
      //luego a cada uno de ellos se le genera una card y se agrega a divEventos
      filtrarData(eventosFuturos,[filterByName(barraBusqueda.value)],checkCategory()).forEach(event => {
        divEventos.appendChild(generateCard(event));
    });
}

function checkCategory(){
    //obtengo todas las categorias tildadas por el usuario
    let presionadas=[];
    let categories = document.getElementsByClassName("checkbox-category");
    for (category of categories){
        if(category.checked)
            presionadas=presionadas.concat(category);
    }
    //devuelvo un array de funciones para construir el filtro de manera dinamica
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