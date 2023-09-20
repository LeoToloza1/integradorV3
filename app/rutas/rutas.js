import  Router from "express";
import { generarPreguntas } from "../../scripts/index.mjs";
import {conn} from "../dbconfig.js"
const router = Router();

router.get('/', (req, res) => {
    res.send("Hola mundo")
  });
  // ruta para obtener las preguntas
  router.get('/preguntas', async (req, res) => {
    try {
      const preguntas = await generarPreguntas();
      res.json({ preguntas });
      console.log("ENTRO A LA RUTA /PREGUNTAS")
    } catch (error) {
      console.error('Error al generar las preguntas:', error);
      res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
});
// ruta para guardar el nombre
router.post('/guardarDatos', async (req, res) => {
  try {
    const nombre = req.body.nombre;
    const puntaje = req.body.puntaje;
    const tiempo = req.body.tiempoTranscurrido;
    const dificultad = req.body.dificultad;
    const query = `INSERT INTO integrador.jugadores (nombre, tiempo, puntaje, dificultad) VALUES (?, ?, ?, ?)`;
    const results = await conn.query(query, [nombre, tiempo, puntaje, dificultad]);
    if (results.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: 'El nombre se guardó correctamente'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Ocurrió un error al guardar el nombre'
      });
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});
// ruta para obtener los datos de los jugadores
router.get('/obtenerJugadores', async (req, res) => {
  try {
    const query = 'SELECT * FROM integrador.jugadores';
    const results = await conn.query(query);
    res.status(200).json({ success: true, jugadores: results });
  } catch (error) {
    console.error('Error al obtener los datos de los jugadores:', error);
    res.status(500).json({ success: false, message: 'Error al obtener los datos de los jugadores' });
  }
});

export default router;