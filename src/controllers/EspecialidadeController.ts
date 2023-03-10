import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { especialidadeRepository } from "../repositories/especialidadeRepository";

export class EspecialidadeController {
  async list(req: Request, res: Response) {
    const especialidades = await especialidadeRepository.find();
    return res.json(especialidades);
  }

  async create(req: Request, res: Response) {
    const { descricao } = req.body;

    if (!descricao) {
      throw new BadRequestError("O campo descrição é obrigatório");
    }

    const newEspecialidade = especialidadeRepository.create({
      descricao,
    });
    await especialidadeRepository.save(newEspecialidade);
    return res.status(201).json(newEspecialidade);
  }

  async update(req: Request, res: Response) {
    const { descricao } = req.body;
    const { idEspecialidade } = req.params;

    const especialidade = await especialidadeRepository.findOneBy({
      id: Number(idEspecialidade),
    });

    if (!especialidade) {
      throw new NotFoundError("Registro não encontrado!");
    }

    especialidade.descricao = descricao;

    await especialidadeRepository.save(especialidade);
    return res.json(especialidade);
  }

  async delete(req: Request, res: Response) {
    const { idEspecialidade } = req.params;

    if (
      !(await especialidadeRepository.findOneBy({
        id: Number(idEspecialidade),
      }))
    ) {
      throw new NotFoundError("Registro não encontrado!");
    }

    await especialidadeRepository.delete(idEspecialidade);
    return res.json({ message: "Especialidade removida!" });
  }
}
