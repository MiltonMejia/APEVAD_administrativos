var grafica;
var grupo;
var pestana;

/**********EVENTO: LEER DOM**********/
$(function () {
$('#divPromedio').hide();
  if(sessionStorage.getItem("sesion"))
  {
    llenarGrupos();
    crearTablaGrupos();
    crearInfoEval("alumnos", "#txtTotAlum");
    crearInfoEval("docentes", "#txtTotDoc");
    crearInfoEval("administrativos", "#txtTotAdmin");
    crearInfoEval("evaluados", "#txtTotEval");
    $('#btnInicio').addClass("active");
    $('#divGrupos').hide();
    $('#divPromedio').hide();
    $('#btnUsuario').text("Hola "+sesion.usuario);
  }
  else
  {
    window.location.href = "../index.html";
  }
});

/**********EVENTO: AL PRESIONAR TECLA EN txtBuscar**********/
$("#txtBuscar").on("keyup", function () {
  var value = $(this).val().toLowerCase();
  $("#tblEvaluacion tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

/**********EVENTO: AL CAMBIAR cboGrupos**********/
$('#cboGrupos').on('change', function (e) {
  grupo = this.value;
  switch (pestana) {
    case "administrativos": {
      crearGraficasAdmin(grupo);
      break;
    }
    case "docentes": {
      crearGraficasDoc(grupo);
      break;
    }
    case "satisfaccion": {
      crearGraficasSat(grupo);
      break;
    }
  }
});

/**********EVENTO: PRESIONAR PESTAÑAS EN BARRA LATERAL**********/
$('a').click(function (e) {
  $('#chart_div').empty();
  $('#btnInicio').removeClass("active");
  $('#btnAdministrativos').removeClass("active");
  $('#btnDocentes').removeClass("active");
  $('#btnConfiguracion').removeClass("active");
  $('#btnSatisfaccion').removeClass("active");
  $('#btnPromedioDocentes').removeClass("active");
  $('#btnPromedioAdministrativos').removeClass("active");
  $('#divInicio').hide();
  $('#divGrupos').hide();
  $('#divPromedio').hide();

  switch (e.target.id) {
    case "btnInicio": {
      $('#btnInicio').addClass("active");
      $('#divInicio').show();
      $('#txtTitulo').text("UNIVERSIDAD ALVA EDISON - APEVAD");
      $('#navdrawerDefault').navdrawer('hide');
      break;
    }
    case "btnAdministrativos": {
      if (pestana != null && grupo != null) {
        crearGraficasAdmin(grupo);
      }
      $('#divGrupos').show();
      $('#btnAdministrativos').addClass("active");
      $('#txtTitulo').text("UNIVERSIDAD ALVA EDISON - ADMINISTRATIVOS");
      pestana = "administrativos";
      $('#navdrawerDefault').navdrawer('hide');
      break;
    }
    case "btnDocentes": {
      if (pestana != null && grupo != null) {
        crearGraficasDoc(grupo);
      }
      $('#divGrupos').show();
      $('#btnDocentes').addClass("active");
      $('#txtTitulo').text("UNIVERSIDAD ALVA EDISON - DOCENTES");
      pestana = "docentes";
      $('#navdrawerDefault').navdrawer('hide');
      break;
    }
    case "btnSatisfaccion": {
      if (pestana != null && grupo != null) {
        crearGraficasSat(grupo);
      }
      $('#divGrupos').show();
      $('#btnSatisfaccion').addClass("active");
      $('#txtTitulo').text("UNIVERSIDAD ALVA EDISON - SATISFACCIÓN");
      pestana = "satisfaccion";
      $('#navdrawerDefault').navdrawer('hide');
      break;
    }
    case "btnPromedioDocentes": {
      $('#btnPromedioDocentes').addClass("active");
      $('#divPromedio').show();
      $('#txtTitulo').text("UNIVERSIDAD ALVA EDISON - PROMEDIO DOCENTES");
      pestana = "promedioDocente";
      crearTablaPromedio();
      $('#navdrawerDefault').navdrawer('hide');
      break;
    }
    case "btnPromedioAdministrativos": {
      $('#btnPromedioAdministrativos').addClass("active");
      $('#divPromedio').show();
      $('#txtTitulo').text("UNIVERSIDAD ALVA EDISON - PROMEDIO ADMINISTRATIVOS");
      pestana = "promedioAdministrativos";
      crearTablaPromedio();
      $('#navdrawerDefault').navdrawer('hide');
      break;
    }
  }
})

/**********EVENTO: CLICK EN CERRAR SESION**********/
$('#btnCerrar').click(function (e) {
  cerrarSesion();
})