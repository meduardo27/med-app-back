import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialidade } from "./Especialidade";
import { Unidade } from "./Unidade";

@Entity("profissional")
export class Profissional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  nome: string;

  @ManyToOne(
    () => Especialidade,
    (especialidade) => especialidade.profissional
  )
  @JoinColumn({ name: "especialidade_id" })
  especialidade: Especialidade;

  @ManyToOne(() => Unidade, (unidade) => unidade.profissional)
  @JoinColumn({ name: "unidade_id" })
  unidade: Unidade;
}
