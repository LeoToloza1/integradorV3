import  Express from "express";
import router from "./rutas/rutas.js";
import path from 'path';
import { fileURLToPath } from 'url';
const directorio = fileURLToPath(import.meta.url);
const app = Express();
const port = process.env.PORT || 8080;
const estaticos = path.join(directorio, '../../front');
//console.log("directorio:"+directorio)
//console.log("RUTA DE ARCHIVOS ESTATICOS:"+estaticos)
app.use(Express.static(estaticos));
app.use(Express.json());
app.use(Express.urlencoded({ extended: true })); 
app.use('/', router);


app.listen(port,()=>{
    console.log(`Corriendo en el puerto: ${port}`);
});


 export{app,estaticos} 