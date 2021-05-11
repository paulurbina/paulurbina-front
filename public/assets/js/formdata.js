$(document).ready(function() {
    // Handler for .ready() called.
    $('.mfControls button').attr('disabled', false)
});

const alertNotification = (msg, clr) => {
    return `<div class="alert ${clr} alert-dismissible fade show text-center" role="alert">
    <strong>${msg}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
    `
}

const buttonFormLoader = (html) => {
    $('.mfControls button').html(html)
}

$.validator.addMethod("formAlphanumeric", function(value, element) {
    var pattern = /^[\w]+$/i;
    return this.optional(element) || pattern.test(value);
}, "El campo debe tener un valor alfanumérico (azAZ09)");

$.validator.addMethod("formEmail", function(value, element) {
    var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    return this.optional(element) || pattern.test(value);
}, "Formato del email incorrecto");

$('#productoForm').validate({
    rules: {
        name: {
            required: true,
            minlength: 4
        },
        phone: {
            required: true,
            minlength: 9
        },
        email: {
            required: true,
            email: true,
        },
    },
    messages: {
        name: {
            required: 'Nombre es requerido',
            minlength: 'Ingrese 4 letras minimo',
        },
        phone: {
            required: 'Celular es requerido',
            minlength: 'No tiene el formato o no es un celular'
        },
        email: {
            required: 'Email es requerido'
        }
    },
    submitHandler: function send() {
        let name = document.getElementById("name")
        let phone = document.getElementById("phone")
        let email = document.getElementById("email")
        const data = {
            name: name.value,
            phone: phone.value,
            email: email.value
        }
        const div = document.querySelector('.alert_notification')
        buttonFormLoader('<i class="fa fa-spinner fa-spin"></i>')


        $.ajax({
            url: 'https://paulurbina.herokuapp.com/api/new-user-register',
            method: 'POST',
            data,
        }).done(response => {
            console.log('response', response);
            $('#productoForm')[0].reset();
            div.innerHTML = alertNotification(response.message, "alert-success")
            $('.mfControls button').attr('disabled', true)
            buttonFormLoader('Enviar mensaje')

        }).fail(error => {
            $('#productoForm')[0].reset();
            const errorJSON = error.responseJSON
            if (errorJSON.errors.length > 0) {
                return div.innerHTML = alertNotification(errorJSON.errors[0].msg, "alert-danger")
            }
            return div.innerHTML = alertNotification(errorJSON.message, "alert-warning")
        })
    }
});