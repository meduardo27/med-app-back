import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profissional } from "./Profissional";

@Entity("especialidades")
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  descricao: string;

  @OneToMany(() => Profissional, (profissional) => profissional.especialidade)
  profissional: Profissional[];
}
