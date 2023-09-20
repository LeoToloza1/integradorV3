import { recibirDatos } from "./main.js";
const nombreInput = document.getElementById('nombre');
const principianteButton = document.getElementById('principiante');
const intermedioButton = document.getElementById('intermedio');
const dificilButton = document.getElementById('dificil');

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
    principiante: 75,
    intermedio: 50, 
    dificil: 40     
};
function iniciarJuegoConDificultad(dificultad) {
    tiempoRestante = nivelesDificultad[dificultad];
    iniciarContador(dificultad);
}
principianteButton.addEventListener('click', () => {
    iniciarJuegoConDificultad("principiante");
});
intermedioButton.addEventListener('click', () => {
    iniciarJuegoConDificultad("intermedio");
});
dificilButton.addEventListener('click', () => {
    iniciarJuegoConDificultad("dificil");
});
const progressBarFill = document.getElementById("barraProgreso");
let tiempoRestante;
function iniciarContador(nivelDificultad) {
    const intervalo = setInterval(() => {
        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            tiempoAgotado();
        } else {
            tiempoRestante--;
            const porcentaje = (tiempoRestante / nivelesDificultad[nivelDificultad]) * 100;
            progressBarFill.style.width = porcentaje + "%";
        }
    }, 1000);
}
function tiempoAgotado() {
    const nombre = nombreInput.value.trim();
    alert(`Se acabó el tiempo, ${nombre}`);
}
const columnas = document.querySelectorAll("th");
columnas.forEach((columna) => {
    columna.addEventListener("click", (event) => {
        const indiceColumna = columnas.indexOf(columna);
        if (ranking.sort) {
            ranking.sort((a, b) => {
                return a[indiceColumna] - b[indiceColumna];
            });
        } else {
            ranking = Array.from(ranking);
            ranking.sort((a, b) => {
                return a[indiceColumna] - b[indiceColumna];
            });
        }
        const tbody = document.querySelector("#ranking");
        tbody.innerHTML = "";
        for (const jugador of ranking) {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${jugador.posicion}</td>
                <td>${jugador.nombre}</td>
                <td>${jugador.tiempo}</td>
            `;
            tbody.appendChild(tr);
        }
    });
});
