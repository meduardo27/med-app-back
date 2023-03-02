import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Profissional } from "./Profissional";

@Entity("unidades")
export class Unidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  descricao: string;

  @Column({ type: "text" })
  endereco: string;

  @OneToMany(() => Profissional, profissional => profissional.unidade)
  profissional: Profissional[]
}
