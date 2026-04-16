document.addEventListener('DOMContentLoaded', () => {
    console.log("se cargo la validacion")
    const formRegistro = document.querySelector('#modalRegistro form');
    const formIniciarSesion = document.querySelector('#modalIniciarSesion form');


    if (formRegistro) {
        formRegistro.addEventListener('submit', function (event) {
            const email = document.getElementsByName('email')[0].value;
            const nombreUsuario = document.getElementsByName('nombre_usuario')[0].value;
            const password = document.getElementsByName('password')[0].value;
            const passwordConfirm = document.getElementsByName('passwordConfirm')[0].value;
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let error = false;

            if (!regexEmail.test(email) || email.length > 35) {
                alert("Email inválido.");
                error = true;
            }
            if (nombreUsuario.length < 6 || nombreUsuario.length > 20) {
                alert("Usuario debe tener entre 6 y 20 caracteres.");
                error = true;
            }
            if (password !== passwordConfirm) {
                alert("Las contraseñas no coinciden.");
                error = true;
            }
            if (error) event.preventDefault();
        });
    }


    if (formIniciarSesion) {
        formIniciarSesion.addEventListener('submit', function(event) {
            const identificador = document.getElementsByName('identificador')[0].value;
            const passwordLogin = document.getElementById('passwordLogin').value;
            let error = false;

            // verificacion del usuario
            if (identificador.length < 6) {
                alert("El identificador es muy corto.");
                error = true;
            } else if (identificador.length > 35) { 
                alert("El identificador es demasiado largo.");
                error = true;
            }

            // tamaño contraseña
            if (passwordLogin.length < 8) {
                alert("La contraseña debe tener al menos 8 caracteres.");
                error = true;
            } else if (passwordLogin.length > 21) {
                alert("La contraseña no puede superar los 20 caracteres.");
                error = true;
            }

            if (error) {
                event.preventDefault(); 
            }
        })
    }
});