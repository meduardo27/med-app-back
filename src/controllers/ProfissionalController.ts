import e, { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { especialidadeRepository } from "../repositories/especialidadeRepository";
import { profissionalRepository } from "../repositories/profissionalRepository";
import { unidadeRepository } from "../repositories/unidadeRepository";

export class ProfissionalController {
  async list(req: Request, res: Response) {
    const profissionais = await profissionalRepository.find({
      relations: {
        especialidade: true,
        unidade: true,
      },
    });
    return res.json(profissionais);
  }

  async create(req: Request, res: Response) {
    const { nome } = req.body;
    const { idEspecialidade, idUnidade } = req.params;

    if (!nome) {
      throw new BadRequestError("O campo nome é obrigatório");
    }

    const unidade = await unidadeRepository.findOneBy({
      id: Number(idUnidade),
    });

    if (!unidade) {
      throw new NotFoundError("Unidade não existe");
    }

    const especialidade = await especialidadeRepository.findOneBy({
      id: Number(idEspecialidade),
    });

    if (!especialidade) {
      throw new NotFoundError("Especialidade não existe");
    }

    const newProfissional = profissionalRepository.create({
      nome,
      unidade,
      especialidade,
    });
    await profissionalRepository.save(newProfissional);
    return res.status(201).json(newProfissional);
  }

  async update(req: Request, res: Response) {
    const { nome } = req.body;
    const { idProfissional, idEspecialidade, idUnidade } = req.params;

    const profissional = await profissionalRepository.findOneBy({
      id: Number(idProfissional),
    });

    if (!profissional) {
      throw new NotFoundError("Profissional não encontrado!");
    }

    const especialidade = await especialidadeRepository.findOneBy({
      id: Number(idEspecialidade),
    });

    if (!especialidade) {
      throw new NotFoundError("Especialidade não encontrado!");
    }

    const unidade = await unidadeRepository.findOneBy({
      id: Number(idUnidade),
    });

    if (!unidade) {
      throw new NotFoundError("Unidade não encontrado!");
    }

    profissional.nome = nome;
    profissional.especialidade = especialidade;
    profissional.unidade = unidade;

    await profissionalRepository.save(profissional);
    return res.json(profissional);
  }

  async delete(req: Request, res: Response) {
    const { idProfissional } = req.params;

    if (
      !(await profissionalRepository.findOneBy({
        id: Number(idProfissional),
      }))
    ) {
      throw new NotFoundError("Registro não encontrado!");
    }

    await profissionalRepository.delete(idProfissional);
    return res.json({ message: "Profissional removido!" });
  }
}
