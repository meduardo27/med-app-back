import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialidade } from "./Especialidade";
import { Profissional } from "./Profissional";
import { Unidade } from "./Unidade";

@Entity("consultas")
export class Consulta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  nome: string;

  @Column({ type: "date" })
  dataNasc: Date;

  @Column({ type: "text" })
  genero: string;

  @Column({ type: "text"})
  numeroCelular: string

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.id)
  @JoinColumn({ name: "especialidade_id" })
  especialidade: Especialidade;

  @ManyToOne(() => Profissional, (profissional) => profissional.id)
  @JoinColumn({ name: "profissional_id" })
  profissional: Profissional;

  @ManyToOne(() => Unidade, (unidade) => unidade.id)
  @JoinColumn({ name: "unidade_id" })
  unidade: Unidade;

  @Column({ type: "datetime" })
  dataConsulta: Date;
}
