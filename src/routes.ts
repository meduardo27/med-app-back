import { Router } from "express";
import { ConsultaController } from "./controllers/ConsultaController";
import { EspecialidadeController } from "./controllers/EspecialidadeController";
import { ProfissionalController } from "./controllers/ProfissionalController";
import { UnidadeController } from "./controllers/UnidadeController";

const routes = Router();

routes.get("/consultas", new ConsultaController().list);
routes.post(
  "/consultas/:idEspecialidade/:idUnidade/:idProfissional",
  new ConsultaController().create
);
routes.put(
  "/consultas/:idConsulta/:idEspecialidade/:idUnidade/:idProfissional",
  new ConsultaController().update
);
routes.delete("/consultas/:idConsulta", new ConsultaController().delete);

routes.get("/especialidades", new EspecialidadeController().list);
routes.post("/especialidades", new EspecialidadeController().create);
routes.put(
  "/especialidades/:idEspecialidade",
  new EspecialidadeController().update
);
routes.delete(
  "/especialidades/:idEspecialidade",
  new EspecialidadeController().delete
);

routes.get("/unidades", new UnidadeController().list);
routes.post("/unidades", new UnidadeController().create);
routes.put("/unidades/:idUnidade", new UnidadeController().update);
routes.delete("/unidades/:idUnidade", new UnidadeController().delete);

routes.get("/profissional", new ProfissionalController().list);
routes.post(
  "/profissional/:idEspecialidade/:idUnidade",
  new ProfissionalController().create
);
routes.put(
  "/profissional/:idProfissional/:idEspecialidade/:idUnidade",
  new ProfissionalController().update
);
routes.delete(
  "/profissional/:idProfissional",
  new ProfissionalController().delete
);

export default routes;
