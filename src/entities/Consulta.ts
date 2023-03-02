import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => Especialidade, (especialidade) => especialidade.id)
  @JoinColumn({ name: "especialidade_id" })
  especialidade: Especialidade;

  @OneToOne(() => Profissional, (profissional) => profissional.id)
  @JoinColumn({ name: "profissional_id" })
  profissional: Profissional;

  @OneToOne(() => Unidade, (unidade) => unidade.id)
  @JoinColumn({ name: "unidade_id" })
  unidade: Unidade;

  @Column({ type: "datetime" })
  dataConsulta: Date;
}
