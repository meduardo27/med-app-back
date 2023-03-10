import { Request, Response } from "express";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import { consultaRepository } from "../repositories/consultaRepository";
import { especialidadeRepository } from "../repositories/especialidadeRepository";
import { profissionalRepository } from "../repositories/profissionalRepository";
import { unidadeRepository } from "../repositories/unidadeRepository";

export class ConsultaController {
  async list(req: Request, res: Response) {
    const consultas = await consultaRepository.find({
      relations: {
        especialidade: true,
        unidade: true,
        profissional: true,
      },
    });
    return res.json(consultas);
  }

  async create(req: Request, res: Response) {
    const { nome, dataNasc, genero, dataConsulta, numeroCelular } = req.body;
    const { idEspecialidade, idUnidade, idProfissional } = req.params;

    if (!nome) {
      throw new BadRequestError("O campo nome é obrigatório");
    }

    if (!dataNasc) {
      throw new BadRequestError("O campo data de nascimento é obrigatório");
    }

    if (!genero) {
      throw new BadRequestError("O campo gênero é obrigatório");
    }

    if (!dataConsulta) {
      throw new BadRequestError("O campo data da consulta é obrigatório");
    }

    if (!numeroCelular) {
      throw new BadRequestError("O campo número celular é obrigatório");
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

    const profissional = await profissionalRepository.findOneBy({
      id: Number(idProfissional),
    });

    if (!profissional) {
      throw new NotFoundError("Especialidade não existe");
    }
    const newConsulta = consultaRepository.create({
      nome,
      dataNasc,
      genero,
      dataConsulta,
      numeroCelular,
      especialidade,
      unidade,
      profissional,
    });

    await consultaRepository.save(newConsulta);
    return res.status(201).json(newConsulta);
  }

  async update(req: Request, res: Response) {
    const { nome, dataNasc, genero, dataConsulta, numeroCelular } = req.body;
    const { idConsulta, idEspecialidade, idUnidade, idProfissional } =
      req.params;

    if (!nome) {
      throw new BadRequestError("O campo nome é obrigatório");
    }

    if (!dataNasc) {
      throw new BadRequestError("O campo data de nascimento é obrigatório");
    }

    if (!genero) {
      throw new BadRequestError("O campo gênero é obrigatório");
    }

    if (!dataConsulta) {
      throw new BadRequestError("O campo data da consulta é obrigatório");
    }

    if (!numeroCelular) {
      throw new BadRequestError("O campo número celular é obrigatório");
    }

    const consulta = await consultaRepository.findOneBy({
      id: Number(idConsulta),
    });

    if (!consulta) {
      throw new NotFoundError("Registro não encontrado!");
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

    const profissional = await profissionalRepository.findOneBy({
      id: Number(idProfissional),
    });

    if (!profissional) {
      throw new NotFoundError("Especialidade não existe");
    }

    consulta.nome = nome;
    consulta.dataNasc = dataNasc;
    consulta.genero = genero;
    consulta.dataConsulta = dataConsulta;
    consulta.numeroCelular = numeroCelular;
    consulta.especialidade = especialidade;
    consulta.unidade = unidade;
    consulta.profissional = profissional;

    await consultaRepository.save(consulta);
    return res.json(consulta);
  }

  async delete(req: Request, res: Response) {
    const { idConsulta } = req.params;

    if (!(await consultaRepository.findOneBy({ id: Number(idConsulta) }))) {
      throw new NotFoundError("Registro não encontrado!");
    }

    await consultaRepository.delete(idConsulta);
    return res.json({ message: "Consulta removida!" });
  }
}
