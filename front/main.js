const instruccion = document.getElementById("instruccion");
const preguntaElement = document.getElementById("pregunta");
const opcionesElement = document.getElementById("opciones")
const iniciarJuegoBtn = document.getElementById('IniciarJuego');
let datos = [];
let respuesta;
let opcionSeleccionada;
let respCorrectas = 0;
let respIncorrectas = 0;
let preguntaActual = 0;
async function recibirDatos() {
  try {
    const response = await fetch('/preguntas');
    console.log('Datos cargados');
    datos = await response.json();
    console.log(datos); // aca llegan las preguntas del servidor
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}
recibirDatos();

// Manejar el evento de inicio del juego
iniciarJuegoBtn.addEventListener('click', () => {
  instruccion.style.display = "none"; // ocultar instrucciones
  preguntaElement.classList.add("tarjeta");
  opcionesElement.classList.add("tarjeta");
  mostrarPreguntaActual();

});

// Función para mostrar la pregunta actual en el HTML
function mostrarPreguntaActual() {
 // console.log(datos)
  const pregunta = datos.preguntas[preguntaActual];
  //console.log("linea28: "+pregunta.tipo) hasta aca, todo bien
  preguntaElement.innerHTML = `<h2 class="display-2 text-center">${pregunta.texto}</h2>`;
  opcionesElement.innerHTML = '';
  pregunta.opciones.forEach((opcion, i) => {
    let opcionHTML = '';
    if (pregunta.tipo === 'capital') {
      opcionHTML = `<label class="custom-radio form-check">
          <input type="radio" name="respuesta" 
          value="${opcion}" data-respuesta="${opcion}" 
          id="opcion-${i}" style="display: none;" class="form-check-input"> 
          <span class="form-check-label">${opcion}</span>
        </label>`;
    } else {
      opcionHTML = `<label class="img-fluid custom-radio form-check">
          <input type="radio" name="respuesta" 
          value="${opcion}" data-respuesta="${opcion}" 
          id="opcion-${i}" style="display: none;" class="form-check-input"> 
          <img src="${opcion}" alt="" class="img-fluid">
        </label>`;
    }
    opcionesElement.innerHTML += opcionHTML;
  });
}
opcionesElement.addEventListener('change', (e) => {
  opcionSeleccionada = e.target;
  if (opcionSeleccionada.type === 'radio' && opcionSeleccionada.name === 'respuesta') {
    validarRespuesta(opcionSeleccionada);
  }
});

function validarRespuesta(seleccion) {
  const alertasContainer = document.getElementById("alertas");
  const pregunta = datos.preguntas[preguntaActual];
  const respuestaSeleccionada = seleccion.getAttribute('data-respuesta'); // Obtén la respuesta seleccionada

  if (respuestaSeleccionada === pregunta.respuesta && preguntaActual < datos.preguntas.length) {
    respCorrectas++;
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", "alert-primary", "mt-3");
    alertDiv.setAttribute("role", "alert");
    alertDiv.textContent = "¡Respuesta correcta!";
    alertasContainer.appendChild(alertDiv);
    setTimeout(function () {
      alertDiv.remove();
    }, 1000);
  } else {
    respIncorrectas++;
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert", "alert-danger", "mt-3");
    alertDiv.setAttribute("role", "alert");
    alertDiv.textContent = "¡Respuesta incorrecta!";
    alertasContainer.appendChild(alertDiv);
    setTimeout(function () {
      alertDiv.remove();
    }, 1000);
  }

  preguntaActual++;
  if (preguntaActual < datos.preguntas.length) {
    mostrarPreguntaActual();
  } else {
    mostrarPuntaje();
    console.log("FIN DEL JUEGO BRO");
  }
}

function mostrarPuntaje() {
  alert('Puntaje: ' + respCorrectas);
 /* instruccion.style.display = "inline"; // ocultar instrucciones
  preguntaElement.classList.remove("tarjeta");
  opcionesElement.classList.remove("tarjeta");*/
}