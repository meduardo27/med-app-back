import "express-async-errors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import swaggerDocs from "./swagger.json";
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error";

AppDataSource.initialize().then(() => {
  const app = express();
  const cors = require("cors");

  app.use(cors());
  app.options("*", cors());
  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  return app.listen(process.env.PORT, () =>
    console.log("Servidor está rodando na porta " + process.env.PORT)
  );
});
