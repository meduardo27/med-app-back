import { AppDataSource } from "../data-source";
import { Especialidade } from "../entities/Especialidade";

export const especialidadeRepository =
  AppDataSource.getRepository(Especialidade);
