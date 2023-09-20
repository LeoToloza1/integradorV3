import  Router, { json } from "express";
import { generarPreguntas } from "../../scripts/index.mjs";
const router = Router();

router.get('/', (req, res) => {
    res.send("Hola mundo")
  });
  
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

// Nueva ruta para guardar el nombre
router.post('guardar-nombre', async (req, res) => {
  const nombre = req.body.nombre;

  // Guardar el nombre en la base de datos

  const query = `INSERT INTO integrador.jugadores (nombre,tiempo) VALUES ('?','?');`;

  const results = await con.query(query);

  if (results.affectedRows > 0) {
    res.status(200).send({
      success: true,
      message: 'El nombre se guardó correctamente!'
    });
  } else {
    res.status(500).send({
      success: false,
      message: 'Ocurrió un error al guardar el nombre'
    });
  }
});


export default router;