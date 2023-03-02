import { Request, Response } from "express";
import { consultaRepository } from "../repositories/consultaRepository";
import { especialidadeRepository } from "../repositories/especialidadeRepository";
import { profissionalRepository } from "../repositories/profissionalRepository";
import { unidadeRepository } from "../repositories/unidadeRepository";

export class ConsultaController {
  async list(req: Request, res: Response) {
    try {
      const consultas = await consultaRepository.find({
        relations: {
          especialidade: true,
          unidade: true,
        },
      });
      return res.json(consultas);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    const { nome, dataNasc, genero, dataConsulta } = req.body;
    const { idEspecialidade, idUnidade, idProfissional } = req.params;

    if (!nome) {
      return res.status(400).json({ message: "O campo nome é obrigatório" });
    }

    if (!dataNasc) {
      return res
        .status(400)
        .json({ message: "O campo data de nascimento é obrigatório" });
    }

    if (!genero) {
      return res.status(400).json({ message: "O campo gênero é obrigatório" });
    }

    if (!dataConsulta) {
      return res
        .status(400)
        .json({ message: "O campo data da consulta é obrigatório" });
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

      const profissional = await profissionalRepository.findOneBy({
        id: Number(idProfissional),
      });

      if (!profissional) {
        return res.status(404).json({ message: "Especialidade não existe" });
      }
      const newConsulta = consultaRepository.create({
        nome,
        dataNasc,
        genero,
        dataConsulta,
        especialidade,
        unidade,
        profissional,
      });

      await consultaRepository.save(newConsulta);

      return res.status(201).json(newConsulta);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    const { nome, dataNasc, genero, dataConsulta } = req.body;
    const { idConsulta, idEspecialidade, idUnidade, idProfissional } =
      req.params;

    if (!nome) {
      return res.status(400).json({ message: "O campo nome é obrigatório" });
    }

    if (!dataNasc) {
      return res
        .status(400)
        .json({ message: "O campo data de nascimento é obrigatório" });
    }

    if (!genero) {
      return res.status(400).json({ message: "O campo gênero é obrigatório" });
    }

    if (!dataConsulta) {
      return res
        .status(400)
        .json({ message: "O campo data da consulta é obrigatório" });
    }

    try {
      const consulta = await consultaRepository.findOneBy({
        id: Number(idConsulta),
      });

      if (!consulta) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

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

      const profissional = await profissionalRepository.findOneBy({
        id: Number(idProfissional),
      });

      if (!profissional) {
        return res.status(404).json({ message: "Especialidade não existe" });
      }

      consulta.nome = nome;
      consulta.dataNasc = dataNasc;
      consulta.genero = genero;
      consulta.dataConsulta = dataConsulta;
      consulta.especialidade = especialidade;
      consulta.unidade = unidade;
      consulta.profissional = profissional;

      await consultaRepository.save(consulta);
      return res.json(consulta);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    const { idConsulta } = req.params;

    try {
      if (!(await consultaRepository.findOneBy({ id: Number(idConsulta) }))) {
        return res.status(404).json({ message: "Registro não encontrado!" });
      }

      await consultaRepository.delete(idConsulta);
      return res.json({ message: "Consulta removida!" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
