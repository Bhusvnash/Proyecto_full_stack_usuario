import express from "express";
import cors from "cors";
import { registro } from './src/helps/registro.log.js'
import  rutausuario from "./src/modules/usuario/usuario.router.js";

const app = express();
const PORT = 4100;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(registro);
app.use(rutausuario);
app.listen(PORT,
  () => { console.log(`Server iniciado en : http://localhost:${PORT}`); 
});
