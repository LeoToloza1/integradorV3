import  Router from "express";
import {estaticos}  from "../app.js";
import path from 'path';
const router = Router();

router.get('/', (req, res) => {
    res.send("Hola mundo")
    console.log("entre a la ruta raiz")
  });
  

export default router