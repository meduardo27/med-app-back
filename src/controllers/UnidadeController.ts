import { Request, Response } from "express";
import { unidadeRepository } from "../repositories/unidadeRepository";

export class UnidadeController {
  async list(req: Request, res: Response) {
    try {
      const unidades = await unidadeRepository.find();
      return res.json(unidades);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    const { descricao, endereco } = req.body;

    if (!descricao) {
      return res
        .status(400)
        .json({ message: "O campo descrição é obrigatório" });
    }
    if (!endereco) {
      return res
        .status(400)
        .json({ message: "O campo endereço é obrigatório" });
    }

    try {
      const newUnidade = unidadeRepository.create({
        descricao,
        endereco,
      });
      await unidadeRepository.save(newUnidade);
      return res.status(201).json(newUnidade);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    const { descricao, endereco } = req.body;
    const { idUnidade } = req.params;

    if (!descricao) {
      return res
        .status(400)
        .json({ message: "O campo descrição é obrigatório" });
    }
    if (!endereco) {
      return res
        .status(400)
        .json({ message: "O campo endereço é obrigatório" });
    }

    try {
      const unidade = await unidadeRepository.findOneBy({
        id: Number(idUnidade),
      });

      if (!unidade) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

      unidade.descricao = descricao;
      unidade.endereco = endereco;

      await unidadeRepository.save(unidade);
      return res.json(unidade);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    const { idUnidade } = req.params;

    try {
      if (!(await unidadeRepository.findOneBy({ id: Number(idUnidade) }))) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

      await unidadeRepository.delete(idUnidade);
      return res.json({ message: "Unidade removida!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
