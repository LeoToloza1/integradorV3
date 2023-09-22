export async function enviarDatosAlServidor(nombre,puntaje,tiempoTranscurrido,dificultad) {
    const datos = {
      nombre: nombre,
      puntaje:puntaje,
      tiempoTranscurrido: tiempoTranscurrido,
      dificultad:dificultad
    };
    try {
      const response = await fetch('/guardarDatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
      });
      if (response.ok) {
        console.log('Datos enviados exitosamente.');
      } else {
        console.error('Error al enviar los datos al servidor.');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const consultarRankingBtn = document.getElementById('consultarRanking');
    const rankingTbody = document.getElementById('ranking');
    consultarRankingBtn.addEventListener('click', async () => {
      try {
        const response = await fetch('/obtenerJugadores');
        const data = await response.json();
        if (data.success) {
            jugadores = data.jugadores;
          rankingTbody.innerHTML = '';
          jugadores.forEach((jugador, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
              <td>${jugador.nombre}</td>
              <td>${jugador.puntaje}</td>
              <td>${jugador.tiempo} segundos</td>
              <td>${jugador.dificultad}</td>
            `;
            rankingTbody.appendChild(fila);
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al obtener los datos de los jugadores:', error);
      }
    });
  });
  export let jugadores=[];