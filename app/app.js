import  Express from "express";
import router from "./rutas/rutas.js";
const app = Express();
const port = process.env.PORT || 8080;
app.use('/',router);



app.listen(port,()=>{
    console.log(`Corriendo en el puerto: ${port}`);
});
