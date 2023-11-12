
const botonEnviar = document.getElementById('enviar-btn');
botonEnviar.addEventListener('click', () => enviarDatos());

function enviarDatos() {
    // Obtener los datos del formulario
    let nombre = document.getElementById("nombre").value;
    let cedula = document.getElementById("cedula").value;
    let ubicacion = document.getElementById("ubicacion").value;


    // Validar los datos
    if (nombre === "" || cedula === "" || ubicacion === "" ) {
        Swal.fire('Campos vacíos','Completa todos los campos','error');
        return;
    }

    // Crear un objeto JSON con los datos
    var datosJSON = {
        nombre: nombre,
        cedula: cedula,
        ubicacion: ubicacion
    };

    // Enviar los datos a la API de Flask
    enviarAPI(datosJSON);
}

function enviarAPI(datos) {
    //Función fetch para enviar datos a la API de Flask
    fetch('/guardar_formulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {

        if (data.existeUsuario == true){
            Swal.fire('Usuario Existente','Este usuario ya existe en el sistema','error');
        }
            
        if (data.existeUsuario == false){
            Swal.fire('Genial','Los datos se han guardado','success');
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        Swal.fire('Lo sentimos','Hubo un error al guardar los datos','error');
    });
}


