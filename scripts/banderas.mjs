import { obtenerPreguntas, preguntasAleatorias } from "./capitales.mjs";
import { datos } from "./index.mjs";

export let opcionesBanderas = [];
export let respuestaCorrectaBandera;

export function generarOpcionesBanderas(respuestaCorrectaBandera) {
    opcionesBanderas = [];
    opcionesBanderas.push(respuestaCorrectaBandera);
    while (opcionesBanderas.length < 4) {
        const indiceAleatorio = Math.floor(Math.random() * datos.length);
        const opcionAleatoria = datos[indiceAleatorio].flags.png;
        if (!opcionesBanderas.includes(opcionAleatoria)) {
            opcionesBanderas.push(opcionAleatoria);
        }
    }
    opcionesBanderas.sort(() => Math.random() - 0.5);
    return opcionesBanderas;
}

export function generarBandera() {
    for (let i = 0; i < 5; i++) {
        const indiceAleatorio = Math.floor(Math.random() * datos.length);
        const paisActual = datos[indiceAleatorio];
        const pregunta = {
            tipo: "bandera",
            texto: `Cual es la bandera de ${paisActual.name.common}?`,
            respuesta: paisActual.flags.png,
            opciones: generarOpcionesBanderas(paisActual.flags.png)
        };
        preguntasAleatorias.push(pregunta);
    }
}
