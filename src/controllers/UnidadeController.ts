import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { unidadeRepository } from "../repositories/unidadeRepository";

export class UnidadeController {
  async list(req: Request, res: Response) {
    const unidades = await unidadeRepository.find();
    return res.json(unidades);
  }

  async create(req: Request, res: Response) {
    const { descricao, endereco } = req.body;

    if (!descricao) {
      throw new BadRequestError("O campo descrição é obrigatório");
    }
    if (!endereco) {
      throw new BadRequestError("O campo endereço é obrigatório");
    }

    const newUnidade = unidadeRepository.create({
      descricao,
      endereco,
    });
    await unidadeRepository.save(newUnidade);
    return res.status(201).json(newUnidade);
  }

  async update(req: Request, res: Response) {
    const { descricao, endereco } = req.body;
    const { idUnidade } = req.params;

    if (!descricao) {
      throw new BadRequestError("O campo descrição é obrigatório");
    }
    if (!endereco) {
      throw new BadRequestError("O campo endereço é obrigatório");
    }

    const unidade = await unidadeRepository.findOneBy({
      id: Number(idUnidade),
    });

    if (!unidade) {
      throw new NotFoundError("Registro não encontrado!");
    }

    unidade.descricao = descricao;
    unidade.endereco = endereco;

    await unidadeRepository.save(unidade);
    return res.json(unidade);
  }

  async delete(req: Request, res: Response) {
    const { idUnidade } = req.params;

    if (!(await unidadeRepository.findOneBy({ id: Number(idUnidade) }))) {
      throw new NotFoundError("Registro não encontrado!");
    }

    await unidadeRepository.delete(idUnidade);
    return res.json({ message: "Unidade removida!" });
  }
}
