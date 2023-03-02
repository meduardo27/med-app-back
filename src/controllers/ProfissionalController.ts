import { Request, Response } from "express";
import { especialidadeRepository } from "../repositories/especialidadeRepository";
import { profissionalRepository } from "../repositories/profissionalRepository";
import { unidadeRepository } from "../repositories/unidadeRepository";

export class ProfissionalController {
  async list(req: Request, res: Response) {
    try {
      const profissionais = await profissionalRepository.find({
        relations: {
          especialidade: true,
          unidade: true,
        },
      });
      return res.json(profissionais);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    const { nome } = req.body;
    const { idEspecialidade, idUnidade } = req.params;

    if (!nome) {
      return res.status(400).json({ message: "O campo nome é obrigatório" });
    }

    try {
      const unidade = await unidadeRepository.findOneBy({
        id: Number(idUnidade),
      });

      if (!unidade) {
        return res.status(404).json({ message: "Unidade não existe" });
      }

      const especialidade = await especialidadeRepository.findOneBy({
        id: Number(idEspecialidade),
      });

      if (!especialidade) {
        return res.status(404).json({ message: "Especialidade não existe" });
      }

      const newProfissional = profissionalRepository.create({
        nome,
        unidade,
        especialidade,
      });
      await profissionalRepository.save(newProfissional);
      return res.status(201).json(newProfissional);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    const { nome } = req.body;
    const { idProfissional, idEspecialidade, idUnidade } = req.params;

    try {
      const profissional = await profissionalRepository.findOneBy({
        id: Number(idProfissional),
      });

      if (!profissional) {
        return res
          .status(404)
          .json({ message: "Profissional não encontrado!" });
      }

      const especialidade = await especialidadeRepository.findOneBy({
        id: Number(idEspecialidade),
      });

      if (!especialidade) {
        return res
          .status(404)
          .json({ message: "Especialidade não encontrado!" });
      }

      const unidade = await unidadeRepository.findOneBy({
        id: Number(idUnidade),
      });

      if (!unidade) {
        return res.status(404).json({ message: "Unidade não encontrado!" });
      }

      profissional.nome = nome;
      profissional.especialidade = especialidade;
      profissional.unidade = unidade;

      await profissionalRepository.save(profissional);
      return res.json(profissional);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    const { idProfissional } = req.params;

    try {
      if (
        !(await profissionalRepository.findOneBy({
          id: Number(idProfissional),
        }))
      ) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

      await profissionalRepository.delete(idProfissional);
      return res.json({ message: "Profissional removido!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
