var formulario = document.getElementById("login-form");
$(function () {
    $("#txtUsuario").val("");
    $("#cboBase").prop('selectedIndex', -1);
});
formulario.addEventListener('submit', function(e)
{
    let usuario = $("#txtUsuario").val();
    let contrasena = $("#txtContrasena").val();
    let base = $("#cboBase").val();
    e.preventDefault();
    
    let json_login = {
        "usuario":usuario,
        "contrasena":contrasena,
        "base":base.toLowerCase()
    };

    $.ajax({
        type : "POST",
        url : "",
        dataType: "json",
        data: JSON.stringify(json_login),
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (data) {
            let datos_sesion = {
                "usuario":data.usuario,
                "base":base.toLowerCase(),
                "token":data.token
            }
            sessionStorage.setItem("sesion",JSON.stringify(datos_sesion));
            Swal.fire({
                type: 'success',
                html: "Bienvenido " + data.usuario,
                timer: 1500,
                showCancelButton: false,
                showConfirmButton: false,
                onBeforeOpen: () => {timerInterval = setInterval(() => 100)},
                onClose: () => {window.location.href = "panel/panel.html";}
            })
            $("#loading").hide();
        },
        error: function (error) {
            Swal.fire({
                type: 'error',
                text: error.responseJSON.msg
            });
            $("#loading").hide();
        },
        fail: function(error){
            alert(error)
        }
    });

    
});