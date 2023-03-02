import { Request, Response } from "express";
import { especialidadeRepository } from "../repositories/especialidadeRepository";

export class EspecialidadeController {
  async list(req: Request, res: Response) {
    try {
      const especialidades = await especialidadeRepository.find();
      return res.json(especialidades);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    const { descricao } = req.body;

    if (!descricao) {
      return res
        .status(400)
        .json({ message: "O campo descrição é obrigatório" });
    }

    try {
      const newEspecialidade = especialidadeRepository.create({
        descricao,
      });
      await especialidadeRepository.save(newEspecialidade);
      return res.status(201).json(newEspecialidade);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    const { descricao } = req.body;
    const { idEspecialidade } = req.params;

    try {
      const especialidade = await especialidadeRepository.findOneBy({
        id: Number(idEspecialidade),
      });

      if (!especialidade) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

      especialidade.descricao = descricao;

      await especialidadeRepository.save(especialidade);
      return res.json(especialidade);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    const { idEspecialidade } = req.params;

    try {
      if (
        !(await especialidadeRepository.findOneBy({
          id: Number(idEspecialidade),
        }))
      ) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

      await especialidadeRepository.delete(idEspecialidade);
      return res.json({ message: "Especialidade removida!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
