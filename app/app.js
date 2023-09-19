import  Express from "express";
import router from "./rutas/rutas.js";
import path from 'path';
import { fileURLToPath } from 'url';
const directorio = fileURLToPath(import.meta.url);
const app = Express();
const port = process.env.PORT || 8080;
const estaticos = path.join(directorio, '../../front');
//console.log("directorio:"+directorio)
console.log("RUTA DE ARCHIVOS ESTATICOS:"+estaticos)

// Primero, utiliza el middleware de Express para servir archivos estáticos
app.use(Express.static(estaticos));

// Luego, define tus rutas, asegúrate de que estas rutas estén después del middleware estático
app.use('/', router);


app.listen(port,()=>{
    console.log(`Corriendo en el puerto: ${port}`);
});


 export{app,estaticos} 