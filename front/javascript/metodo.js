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
        } else {
            tiempoRestante--;
            const porcentaje = (tiempoRestante / nivelesDificultad[nivelDificultad]) * 100;
            progressBarFill.style.width = porcentaje + "%";
        }
    }, 500);
}

export function tiempoAgotado() {
    const nombre = nombreInput.value.trim();
    const tiempoFin = Date.now();
    tiempoTranscurrido = (tiempoFin - tiempoInicio) / 1000;
    alert(`Se acabó el tiempo, ${nombre}. Tiempo transcurrido: ${tiempoTranscurrido} segundos`);
    enviarDatosAlServidor(nombre,respCorrectas, tiempoTranscurrido,dificultad);
}
import { jugadores } from "./datos.js";
const columnas = document.querySelectorAll(".sortable");
const tabla = document.querySelector("table");
let ordenColumna = Array.from(columnas).fill(null);

columnas.forEach((columna, indiceColumna) => {
    columna.addEventListener("click", (event) => {
        ordenColumna[indiceColumna] = !ordenColumna[indiceColumna];
        columnas.forEach((col) => col.classList.remove("asc", "desc"));
        if (ordenColumna[indiceColumna]) {
            columna.classList.add("asc");
        } else {
            columna.classList.add("desc");
        }
        jugadores.sort((a, b) => {
            if (ordenColumna[indiceColumna]) {
                return a[ordenColumna].localeCompare(b[ordenColumna]);
            } else {
                return b[ordenColumna].localeCompare(a[ordenColumna]);
            }
        });
        renderizarTabla();
    });
});
function renderizarTabla() {
    const tbody = document.querySelector("#ranking");
    tbody.innerHTML = "";
    jugadores
        .filter(jugador => jugador && jugador.tiempo)
        .sort((a, b) => {
            if (ordenColumna[indiceColumna]) {
                return a.tiempo.localeCompare(b.tiempo);
            } else {
                return b.tiempo.localeCompare(a.tiempo);
            }
        })
        .forEach((jugador, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.puntaje}</td>
                <td>${jugador.tiempo}</td>
                <td>${jugador.dificultad}</td>
            `;
            tbody.appendChild(tr);
        });
}
renderizarTabla();