//obtener elementos de la tabla
let filaGeneral=document.getElementById("general-events");
let tbodyUpcoming=document.getElementById("categories-upcoming");
let tbodyPast=document.getElementById("categories-past");

//obtener datos
let data;
//obtener datos
fetch("https://mindhub-xj03.onrender.com/api/amazing").then(datos=>datos.json()).then(
    api=>{
        data=api;
        ManipularEvents();
    });


function ManipularEvents(){
    //categorias pasadas
    let eventosPasados=getPastEvents(data.currentDate);
    let categoriasPasadas= getCategories(eventosPasados);
    //categorias futuras
    let eventosFuturos=getFutureEvents(data.currentDate);
    let categoriasFuturas= getCategories(eventosFuturos);

    //crear primera fila
    let mostAssistance=MostAssistance(eventosPasados);
    let lessAssistance=LessAssistance(eventosPasados);
    let mostCapacity=MostCapacity(eventosPasados);
    filaGeneral.appendChild(createCell(`${mostAssistance.name} (${(percentageAssistance(mostAssistance)*100).toFixed(2)}%)`));
    filaGeneral.appendChild(createCell(`${lessAssistance.name} (${(percentageAssistance(lessAssistance)*100).toFixed(2)}%)`));
    filaGeneral.appendChild(createCell(`${mostCapacity.name} (${mostCapacity.capacity})`));

    
    //agregar una fila por cada categoria y rellenar
    categoriasFuturas.forEach(category=>{
        //crear fila
        let fila=createRow();
        //filtrar eventos
        let eventos = findByCategory(category);
        //primera celda con titulo
        fila.appendChild(createCell(category));
        //ganancias
        fila.appendChild(createCell(`$${getEventsRevenues(eventos)}`));
        //porcentaje de asistencia promedio
        fila.appendChild(createCell(`${(getEventsAttendance(eventos)*100).toFixed(2)}%`));
        //unir fila a la tabla
        tbodyUpcoming.appendChild(fila);
    });

    
    //agregar una fila por cada categoria y rellenar
    categoriasPasadas.forEach(category=>{
        //crear fila
        let fila=createRow();
        //filtrar eventos
        let eventos = findByCategory(category);
        //primera celda con titulo
        fila.appendChild(createCell(category));
        //ganancias
        fila.appendChild(createCell(`$${getEventsRevenues(eventos)}`));
        //porcentaje de asistencia promedio
        fila.appendChild(createCell(`${(getEventsAttendance(eventos)*100).toFixed(2)}%`));
        //unir fila a la tabla
        tbodyPast.appendChild(fila);
    });
}