import { recibirDatos } from "./main.js";
const nombreInput = document.getElementById('nombre');
   export const iniciarJuegoButton = document.getElementById('iniciarJuego');
   nombreInput.addEventListener('input', function() {
       if (nombreInput.value.trim() !== '') {
           iniciarJuegoButton.removeAttribute('disabled');
       } else {
           iniciarJuegoButton.setAttribute('disabled', 'true');
       }
   });
   iniciarJuegoButton.addEventListener('click', function() {
       const nombre = nombreInput.value.trim();
       alert(`¡Bienvenido, ${nombre}! El juego ha comenzado.`);
   });

