import { opcionesCapitales, preguntasAleatorias } from "./capitales.mjs";
import { opcionesBanderas } from "./banderas.mjs";

let opciones = [];
let respuesta;
let respCorrectas = 0;
let respIncorrectas = 0;
let preguntaActual = 0;

function mezclarOpciones() {
  opciones = opcionesCapitales.concat(opcionesBanderas);
  opciones.sort(() => Math.random() - 0.5);
}

function iniciarJuego() {
  if (preguntaActual < preguntasAleatorias.length) {
    const pregunta = preguntasAleatorias[preguntaActual];
   // console.log(`Pregunta: ${pregunta.texto}`);
    respuesta = pregunta.respuesta;
    for (let i = 0; i < pregunta.opciones.length; i++) {
      const opcion = pregunta.opciones[i];
      //console.log(`Opción ${i + 1}: ${opcion}`);
    }
  } else {
    mostrarPuntaje();
  }
}
function mostrarPuntaje() {
  console.log('Puntaje: ' + respCorrectas);
}

function validarRespuesta(seleccion, respuesta) {
  if (seleccion.value === respuesta && preguntaActual < preguntasAleatorias.length) {
    respCorrectas++;
    console.log('¡Respuesta correcta!');
  } else {
    respIncorrectas++;
    console.log('¡Respuesta incorrecta!');
  }
  preguntaActual++;
  iniciarJuego();
}
function opcionesElementClickListener(e) {
  opcionSeleccionada = e.target;
  if (opcionSeleccionada.type === 'radio' && opcionSeleccionada.name === 'respuesta') {
    validarRespuesta(opcionSeleccionada, respuesta);
  }
}
export {
  mezclarOpciones,
  iniciarJuego,
  mostrarPuntaje
};
