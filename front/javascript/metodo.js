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

// Función para ordenar la tabla por una columna específica
document.addEventListener('DOMContentLoaded', function () {
 
  ordenarTabla(2);
});

   
function ordenarTabla(columna) {
    const tabla = document.getElementById('tablaRanking');
    const tbody = tabla.querySelector('tbody');
    const filas = Array.from(tbody.querySelectorAll('tr'));
  
    // Ordenar las filas en función del valor de la columna seleccionada
    filas.sort((filaA, filaB) => {
      const valorA = filaA.cells[columna].textContent.trim();
      const valorB = filaB.cells[columna].textContent.trim();
      return valorA.localeCompare(valorB, undefined, { numeric: true, sensitivity: 'base' });
    });
  
    // Vaciar el cuerpo de la tabla
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  
    // Volver a agregar las filas ordenadas
    filas.forEach(fila => {
      tbody.appendChild(fila);
    });
  }





/*
const columnas = document.querySelectorAll(".sortable");
let ordenColumna = Array.from(columnas).fill(null);
let indiceColumna;
columnas.forEach((columna, indiceColumna) => {
    columna.addEventListener("click", (event) => {
        ordenColumna[indiceColumna] = !ordenColumna[indiceColumna];
        columnas.forEach((col) => col.classList.remove("asc", "desc"));
        if (ordenColumna[indiceColumna]) {
            columna.classList.add("asc");
        } else {
            columna.classList.add("desc");
        }
        renderizarTabla();
    });
});
function renderizarTabla() {
    const tbody = document.querySelector("#ranking");
    const filas = Array.from(tbody.querySelectorAll("tr"));
    filas.sort((filaA, filaB) => {
        const valorA = filaA.children[indiceColumna].textContent;
        const valorB = filaB.children[indiceColumna].textContent;
        if (ordenColumna[indiceColumna]) {
            return valorA.localeCompare(valorB);
        } else {
            return valorB.localeCompare(valorA);
        }
    });
    filas.forEach((fila) => tbody.removeChild(fila));
    filas.forEach((fila, index) => {
        tbody.appendChild(fila);
        fila.querySelector("td:first-child").textContent = index + 1;
    });
}

renderizarTabla();
*/