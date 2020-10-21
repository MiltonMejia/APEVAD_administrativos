var sesion = $.parseJSON(sessionStorage.getItem("sesion"));
let body_request = "usuario="+sesion.usuario+"&base="+sesion.base+"&token="+sesion.token;
/**********LLENADO GRUPOS**********/
function llenarGrupos() {
    $.ajax({
        url: "https://api.unialvaedison.edu.mx/v1/grupos",
        type: "GET",
        dataType: "json",
        data: body_request,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (data) {
            $("#cboGrupos").empty();
            $("#cboGrupos").append('<option selected="true" disabled="disabled">Seleccione un Grupo</option>');
            data.forEach(element => {
                $("#cboGrupos").append('<option>' + element.id_grupo + '</option>');
            });
            $("#loading").hide();
        },
        error: function (error) {
            console.log("Error al recuperar los grupos");
        }
    });
}

/**********TARJETA INFORMACION DE EVALUACION**********/
function crearInfoEval(categoria, columna) {

    $.ajax({
        url: "" + categoria + "/totales",
        type: "GET",
        dataType: "json",
        data: body_request,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (data) {
            $(columna).text(data.total);
            $("#loading").hide();
        },
        error: function (error) {
            console.log("Error al recuperar los grupos");
        }
    });
}

/**********TARJETA INFORMACION DE GRUPOS**********/
function crearTablaGrupos() {
    $.ajax({
        url: "",
        type: "GET",
        dataType: "json",
        data: body_request,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (tabla) {
            tabla.forEach(fila => {
                $('#tblEvaluacion').append("<tr><td>" + fila.id_grupo + "</td><td>" + fila.total_alumnos + "</td><td>" + fila.encuestas_realizadas + "</td></tr>")
            })
            $("#loading").hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

/**********GRAFICA PARA PANEL ADMINISTRATIVOS**********/
function crearGraficasAdmin(grupo) {
    $.ajax({
        url: "" + grupo + "/administrativos/categorias/promedios",
        type: "GET",
        dataType: "json",
        data: body_request,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (datos) {
            $('#chart_div').empty();
            datos.forEach(columna => {
                let tabla = [
                    ['Categoria', 'Promedio'],
                    [columna[1].nombre, parseInt(columna[1].promedio)],
                    [columna[2].nombre, parseInt(columna[2].promedio)],
                    [columna[3].nombre, parseInt(columna[3].promedio)],
                    [columna[4].nombre, parseInt(columna[4].promedio)]
                ];
                let contenedor = $('#chart_div').append('<div class="card m-5"><div class="card-header d-flex"><h3 class="m-0 col-9">' + columna[0].nombre + '</h3><a href="' + grupo + '/administrativos/' + columna[0].id + '/excel?'+body_request+'" title="Descargar las encuestas del departamento/administrativo: ' + columna[0].nombre + ' del grupo: ' + grupo + ' en Excel" class="col-3 d-flex justify-content-end"><i class="material-icons md-48 text-white"> cloud_download </i></a></div><div id="' + columna[0].id + '" class="card-body p-5"></div></div>');
                dibujarGrafica(tabla, contenedor, columna[0].id);
            })
            $("#loading").hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

/**********GRAFICA PARA PANEL DOCENTES**********/
function crearGraficasDoc(grupo) {
    $.ajax({
        url: "" + grupo + "/docentes/categorias/promedios",
        type: "GET",
        dataType: "json",
        data: body_request,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (datos) {
            $('#chart_div').empty();
            datos.forEach(columna => {
                let tabla = [
                    ['Categoria', 'Promedio'],
                    [columna[1].nombre, parseInt(columna[1].promedio)],
                    [columna[2].nombre, parseInt(columna[2].promedio)],
                    [columna[3].nombre, parseInt(columna[3].promedio)],
                    [columna[4].nombre, parseInt(columna[4].promedio)],
                    [columna[5].nombre, parseInt(columna[5].promedio)],
                    [columna[6].nombre, parseInt(columna[6].promedio)],
                    [columna[7].nombre, parseInt(columna[7].promedio)],
                    [columna[8].nombre, parseInt(columna[8].promedio)]
                ];
                let contenedor = $('#chart_div').append('<div class="card my-5"><div class="card-header d-flex"><h3 class="m-0 col-9">' + columna[0].nombre + '</h3><a href="https://api.unialvaedison.edu.mx/v1/grupos/' + grupo + '/docentes/' + columna[0].id + '/excel?'+body_request+'" title="Descargar las encuestas del docente: ' + columna[0].nombre + ' del grupo: ' + grupo + ' en Excel" class="col-3 d-flex justify-content-end"><i class="material-icons md-48 text-white"> cloud_download </i></a></div><div id="' + columna[0].id + '" class="card-body p-5"></div></div>');
                dibujarGrafica(tabla, contenedor, columna[0].id);
            })
            $("#loading").hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

/**********GRAFICA PARA PANEL SATISFACCION**********/
function crearGraficasSat(grupo) {
    $.ajax({
        url: "" + grupo + "/satisfaccion/categorias/promedios",
        type: "GET",
        dataType: "json",
        data: body_request,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (columna) {
            $('#chart_div').empty();
            let tabla = [
                ['Categoria', 'Promedio'],
                [columna[0].nombre, parseInt(columna[0].promedio)],
                [columna[1].nombre, parseInt(columna[1].promedio)],
                [columna[2].nombre, parseInt(columna[2].promedio)],
                [columna[3].nombre, parseInt(columna[3].promedio)],
                [columna[4].nombre, parseInt(columna[4].promedio)],
                [columna[5].nombre, parseInt(columna[5].promedio)],
                [columna[6].nombre, parseInt(columna[6].promedio)],
                [columna[7].nombre, parseInt(columna[7].promedio)],
                [columna[8].nombre, parseInt(columna[8].promedio)],
                [columna[9].nombre, parseInt(columna[9].promedio)],
                [columna[10].nombre, parseInt(columna[10].promedio)],
                [columna[11].nombre, parseInt(columna[11].promedio)],
                [columna[12].nombre, parseInt(columna[12].promedio)],
                [columna[13].nombre, parseInt(columna[13].promedio)],
                [columna[14].nombre, parseInt(columna[14].promedio)],
                [columna[15].nombre, parseInt(columna[15].promedio)],
                [columna[16].nombre, parseInt(columna[16].promedio)],
                [columna[17].nombre, parseInt(columna[17].promedio)]
            ];
            let contenedor = '<div class="card my-5"><div class="card-header d-flex"><h3 class="m-0 col-9">Satisfacción</h3><a href="' + grupo + '/satisfaccion/excel?'+body_request+'" title="Descargar las encuestas de Satisfacción del grupo: ' + grupo + ' en Excel" class="col-3 d-flex justify-content-end"><i class="material-icons md-48 text-white"> cloud_download </i></a></div><div id="' + grupo + '" class="card-body p-5"></div></div>'

            dibujarGrafica(tabla, contenedor, grupo);
            $("#loading").hide();
        },
        error: function (error) {
            console.log(error);
        }
    });
}

/**********FUNCION PARA DIBUJAR GRAFICAS DE BARRAS**********/
function dibujarGrafica(tabla, contenedor, id_contenedor) {
    google.charts.load('current', {
        callback: function () {
            let data = google.visualization.arrayToDataTable(tabla);

            let options = {
                height: "250",
                legend: {
                    position: "none"
                },
                colors: "#D29500",
                hAxis: {
                    title: "",
                    showTextEvery: 1
                },
            };

            $('#chart_div').append(contenedor);
            let chart = new google.charts.Bar(document.getElementById(id_contenedor));
            chart.draw(data, google.charts.Bar.convertOptions(options));
        },
        'packages': ['corechart', 'bar']
    });
}

/**********FUNCION PARA SALIR DE LA SESION**********/
function cerrarSesion()
{
    sessionStorage.removeItem("sesion");
    Swal.fire({
        type: 'success',
        html: "Sesion cerrada correctamente",
        timer: 1500,
        showCancelButton: false,
        showConfirmButton: false,
        onBeforeOpen: () => {timerInterval = setInterval(() => 100)},
        onClose: () => {window.location.href = "../index.html";}
    })

}

/**********TARJETA INFORMACION DE GRUPOS**********/
async function crearTablaPromedio() {

    $("#loading").show();

    if(pestana == "promedioDocente")
    {
        encuestado = "docentes";
    }
    else if(pestana == "promedioAdministrativos")
    {
        encuestado = "administrativos";
    }

    $("#contPromedio").empty();

    $("#contPromedio").append('<div class="card my-5"><div class="card-header d-flex"><h3 class="m-0 col-11 justify-content-center align-self-center">Descarga Promedio General</h3><a href="'+sesion.base+'/'+encuestado+'/categorias/promedios/excel?" title="Descargar promedio general" class="card-body"><i class="material-icons md-48 text-white"> cloud_download </i></div></div>');



    let docentes = await $.ajax({
        url: ""+encuestado,
        type: "GET",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: "base="+sesion.base,
        dataType: "json",
    });

    docentes.forEach(fila => {
        $.ajax({
            url: ""+encuestado+"/"+fila.id+"/categorias/promedios",
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            data: "base="+sesion.base,
            dataType: "json",
            success: async function(promedios) {
                $("#contPromedio").append(""+
                "<div class='card mb-5'>"+
                "<div class='card-header d-flex border-0'>"+
                    "<h4 class='m-0 col-9 d-flex align-items-center'>"+fila.nombre+"</h4>"+
                "</div>"+
                "<div class='card-body p-0'>"+
                    "<table class='table-sm table table-striped text-center m-0'>"+
                    "<thead>"+
                        "<tr class='card-header'>"+
                        "<th scope='col' class='w-25 text-center'>Categoria</th>"+
                        "<th scope='col' class='w-25 text-center'>Promedio</th>"+
                        "</tr>"+
                    "</thead>"+
                    "<tbody id='tblpromedio_"+fila.id+"'>");
                    
                await promedios.forEach(filaPromedio => {
                    $("#tblpromedio_"+fila.id).append(""+
                    "<tr>"+
                        "<td>"+filaPromedio.categoria+"</td>"+
                        "<td>"+filaPromedio.promedio+"</td>"+
                    "</tr>");
                    //$("#promedios").append("<p>"+filaPromedio.categoria+" - "+filaPromedio.promedio+"</p>");
                })

                $("#divPromedio").append(""+
                "</tbody>"+
                "</table>"+
            "</div>"+
            "</div>");
            }
        });
    })

    $("#loading").hide();
}