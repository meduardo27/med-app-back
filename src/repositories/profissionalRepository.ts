import { AppDataSource } from "../data-source";
import { Profissional } from "../entities/Profissional";

export const profissionalRepository = AppDataSource.getRepository(Profissional);
