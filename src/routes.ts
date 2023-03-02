import { Router } from "express";
import { ConsultaController } from "./controllers/ConsultaController";

const routes = Router();

routes.post("/consultas", new ConsultaController().create);
export default routes;
