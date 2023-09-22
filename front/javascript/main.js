const instruccion = document.getElementById("instruccion");
const preguntaElement = document.getElementById("pregunta");
const opcionesElement = document.getElementById("opciones")
const principianteButton = document.getElementById('principiante');
const intermedioButton = document.getElementById('intermedio');
const dificilButton = document.getElementById('dificil');
import { tiempoAgotado } from "./metodo.js";
let datos = [];
let respuesta;
let opcionSeleccionada;
export let respCorrectas = 0;
let respIncorrectas = 0;
export let preguntaActual = 0;
export let cantidadPreguntas;
 export async function recibirDatos() {
  try {
    const response = await fetch('/preguntas');
    console.log('Datos cargados');
    datos = await response.json();
    cantidadPreguntas = datos.preguntas.length;
     // aca llegan las preguntas del servidor
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
}
recibirDatos();

function iniciarJuego() {
  instruccion.style.display = "none"; // ocultar instrucciones
  preguntaElement.classList.add("tarjeta");
  opcionesElement.classList.add("tarjeta");
  mostrarPreguntaActual();
}
principianteButton.addEventListener('click', () => {
  iniciarJuego();
});
intermedioButton.addEventListener('click', () => {
  iniciarJuego();
});
dificilButton.addEventListener('click', () => {
  iniciarJuego();
});
function mostrarPreguntaActual() {
  const pregunta = datos.preguntas[preguntaActual];
  preguntaElement.innerHTML = `<h2 class="display-2 text-center">${pregunta.texto}</h2>`;
  respuesta = pregunta.respuesta;
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

opcionesElement.addEventListener('input', (event) => {
  opcionSeleccionada = event.target;
  validarRespuesta(opcionSeleccionada,respuesta);
});

function validarRespuesta(opcionSeleccionada,respuesta) {
  const alertasContainer = document.getElementById("alertas");
  if (opcionSeleccionada.value == respuesta && preguntaActual < datos.preguntas.length) {
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
    tiempoAgotado();
  }
}
function mostrarPuntaje() {
  alert('Puntaje: ' + respCorrectas);
  preguntaElement.style.display = "none";
  opcionesElement.style.display = "none";
  const reiniciarJuegoButton = document.getElementById('reiniciarJuego');
  reiniciarJuegoButton.style.display = "block";
  reiniciarJuegoButton.addEventListener('click', reiniciarJuego);
}
function reiniciarJuego() {
  respCorrectas = 0;
  respIncorrectas = 0;
  preguntaActual = 0;
  preguntaElement.style.display = "block";
  opcionesElement.style.display = "block";
  const reiniciarJuegoButton = document.getElementById('reiniciarJuego');
  reiniciarJuegoButton.style.display = "none";
}
