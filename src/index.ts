import express from "express";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import swaggerDocs from "./swagger.json";

AppDataSource.initialize().then(() => {
  const app = express();
  const cors = require("cors");

  app.use(cors());
  app.options("*", cors());

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.PORT, () =>
    console.log("Servidor está rodando na porta " + process.env.PORT)
  );
});
