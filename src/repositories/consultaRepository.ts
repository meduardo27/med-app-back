import { AppDataSource } from "../data-source";
import { Consulta } from "../entities/Consulta";

export const consultaRepository = AppDataSource.getRepository(Consulta);
