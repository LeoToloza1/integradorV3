import { recibirDatos } from "./main.js";
import { enviarDatosAlServidor } from "./datos.js";

const nombreInput = document.getElementById('nombre');
const principianteButton = document.getElementById('principiante');
const intermedioButton = document.getElementById('intermedio');
const dificilButton = document.getElementById('dificil');
let tiempoInicio;
let tiempoTranscurrido;
let tiempoRestante;
let juegoEnCurso = false;
let dificultad;
import { preguntaActual } from "./main.js";
import { cantidadPreguntas } from "./main.js"
import { respCorrectas } from "./main.js";
function verificarNombre() {
    if (nombreInput.value.trim() !== '') {
        principianteButton.removeAttribute('disabled');
        intermedioButton.removeAttribute('disabled');
        dificilButton.removeAttribute('disabled');
    } else {
        principianteButton.setAttribute('disabled', 'true');
        intermedioButton.setAttribute('disabled', 'true');
        dificilButton.setAttribute('disabled', 'true');
    }
}
verificarNombre();
nombreInput.addEventListener('input', verificarNombre);

const nivelesDificultad = {
    principiante: 60,
    intermedio: 45,
    dificil: 35
};
function iniciarJuegoConDificultad(dificultad) {
    tiempoInicio = Date.now();
    tiempoRestante = nivelesDificultad[dificultad];
    juegoEnCurso = true;
    iniciarContador(dificultad);
}

principianteButton.addEventListener('click', () => {
    dificultad= "principiante"
    iniciarJuegoConDificultad("principiante");
});
intermedioButton.addEventListener('click', () => {
    dificultad= "intermedio"
    iniciarJuegoConDificultad("intermedio");
});
dificilButton.addEventListener('click', () => {
    dificultad= "dificil"
    iniciarJuegoConDificultad("dificil");
});
const progressBarFill = document.getElementById("barraProgreso");

function iniciarContador(nivelDificultad) {
    const intervalo = setInterval(() => {
        if (!juegoEnCurso) {
            clearInterval(intervalo);
        } else if (tiempoRestante <= 0 || preguntaActual >= cantidadPreguntas) {
            clearInterval(intervalo);
            if (tiempoRestante <= 0) {
                tiempoAgotado();
            }
        } else {
            tiempoRestante--;
            const porcentaje = (tiempoRestante / nivelesDificultad[nivelDificultad]) * 100;
            progressBarFill.style.width = porcentaje + "%";
        }
    }, 1000);
}


export function tiempoAgotado() {
    const nombre = nombreInput.value.trim();
    const tiempoFin = Date.now();
    tiempoTranscurrido = (tiempoFin - tiempoInicio) / 1000;
    alert(`Se acabó el tiempo, ${nombre}. Tiempo transcurrido: ${tiempoTranscurrido} segundos`);
    enviarDatosAlServidor(nombre,respCorrectas, tiempoTranscurrido,dificultad);
    juegoEnCurso = false;
}
