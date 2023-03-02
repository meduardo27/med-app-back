import { AppDataSource } from "../data-source";
import { Unidade } from "../entities/Unidade";

export const unidadeRepository = AppDataSource.getRepository(Unidade);
