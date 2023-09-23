import { mezclarOpciones, iniciarJuego, mostrarPuntaje } from "./main.mjs";
import { obtenerPreguntas, preguntasAleatorias } from "./capitales.mjs";
import fetch from "node-fetch;"
const paisesUrl = "https://restcountries.com/v3.1/all";
export let datos = [];

const cargarDatos = async () => {
  try {
    const resultados = await fetch(paisesUrl);
    datos = await resultados.json();
   // console.log("Datos cargados exitosamente - desde el backend");
  } catch (error) {
    console.error("Error al obtener datos de los países:", error);
  }
};

const generarPreguntas = async () => {
  await cargarDatos();
 // console.log("preguntas :"+preguntasAleatorias)
  const preguntas = obtenerPreguntas(); // Genera preguntas utilizando la función obtenerPreguntas
  mezclarOpciones();
  iniciarJuego();
 //console.log("preguntas en index.js - backend:");
  return preguntas;
};

export { generarPreguntas };
