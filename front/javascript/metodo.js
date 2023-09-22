import { recibirDatos } from "./main.js";
import { enviarDatosAlServidor } from "./datos.js";
const nombreInput = document.getElementById('nombre');
const principianteButton = document.getElementById('principiante');
const intermedioButton = document.getElementById('intermedio');
const dificilButton = document.getElementById('dificil');
const progressBarFill = document.getElementById("barraProgreso");
let tiempoInicio;
let tiempoTranscurrido;
let tiempoRestante;
let juegoEnCurso = false;
let dificultad;
const nivelesDificultad = {
    principiante: 50,
    intermedio: 40,
    dificil: 30
};
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


let tiempoAgotadoFlag = false;

function iniciarContador(nivelDificultad) {
    const intervalo = setInterval(() => {
        if (!juegoEnCurso) {
            clearInterval(intervalo);
            if (tiempoAgotadoFlag) {
                tiempoAgotado();
                activarConfeti();
            }
        } else if (tiempoRestante <= 0 || preguntaActual >= cantidadPreguntas || tiempoTranscurrido >= nivelesDificultad[nivelDificultad]) {
            clearInterval(intervalo);
            if (tiempoRestante <= 0) {
                tiempoAgotadoFlag = true;
                tiempoAgotado();
            } else {
                activarConfeti();
            }
        } else {
            tiempoRestante--;
            const porcentaje = (tiempoRestante / nivelesDificultad[nivelDificultad]) * 100;
            progressBarFill.style.width = porcentaje + "%";
        }
        if (tiempoRestante <= 0) {
            const reiniciarJuegoButton = document.getElementById('reiniciarJuego');
            reiniciarJuegoButton.style.display = "block";
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
    activarConfeti();
}
function activarConfeti() {
    const confettiSettings = {
        target: 'confeti-canvas', 
        max: 500,
        size: 1,
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [[255, 0, 0], [0, 255, 0], [0, 0, 255]],
        clock:50
    };

    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}
