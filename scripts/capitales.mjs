import { generarBandera } from "./banderas.mjs";
import { datos } from "./index.mjs";
export let opcionesCapitales = [];
let preguntasAleatorias = [];

function generarPreguntas() {
  preguntasAleatorias = [];
  for (let i = 0; i < 5; i++) {
    const indiceAleatorio = Math.floor(Math.random() * datos.length);
    const paisActual = datos[indiceAleatorio];
    const pregunta = {
      tipo: "capital",
      texto: `Cual es la capital de ${paisActual.name.common}?`,
      respuesta: paisActual.capital,
      opciones: generarOpciones(paisActual.capital),
    };
    preguntasAleatorias.push(pregunta);
  }
  generarBandera();
  preguntasAleatorias.sort(() => Math.random() - 0.5);
}

function generarOpciones(respuestaCorrecta) {
  opcionesCapitales = [];
  opcionesCapitales.push(respuestaCorrecta);
  while (opcionesCapitales.length < 4) {
    const indiceAleatorio = Math.floor(Math.random() * datos.length);
    const opcionAleatoria = datos[indiceAleatorio].capital;
    if (!opcionesCapitales.includes(opcionAleatoria)) {
      opcionesCapitales.push(opcionAleatoria);
    }
  }
  opcionesCapitales.sort(() => Math.random() - 0.5);
  return opcionesCapitales;
}

function obtenerPreguntas() {
  generarPreguntas();
  return preguntasAleatorias;
}
export { obtenerPreguntas, preguntasAleatorias };

