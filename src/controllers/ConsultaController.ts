import { Request, Response } from "express";
import { consultaRepository } from "../repositories/consultaRepository";

export class ConsultaController {
  async create(req: Request, res: Response) {
    const { nome, dataNasc, genero, dataConsulta } = req.body;
    const { idEspecialidade } = req.params;

    if (!nome) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }

    try {
      const newConsulta = consultaRepository.create({
        nome,
        dataNasc,
        genero,
        dataConsulta,
      });

      await consultaRepository.save(newConsulta);

      return res.status(201).json(newConsulta);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const consultas = await consultaRepository.find({
        relations: {},
      });
    } catch (error) {}
  }
}
