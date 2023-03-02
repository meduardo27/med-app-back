import { MigrationInterface, QueryRunner } from "typeorm";

export class default1677712268072 implements MigrationInterface {
    name = 'default1677712268072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unidades" ("id" int NOT NULL IDENTITY(1,1), "descricao" text NOT NULL, "endereco" text NOT NULL, CONSTRAINT "PK_3e728a664b48bbd90a355065233" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profissional" ("id" int NOT NULL IDENTITY(1,1), "nome" text NOT NULL, "especialidade_id" int, "unidade_id" int, CONSTRAINT "PK_2e385f6afaa389d36d3d718536f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "especialidades" ("id" int NOT NULL IDENTITY(1,1), "descricao" text NOT NULL, CONSTRAINT "PK_73c2740deb4cbe08c28ac487705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "consultas" ("id" int NOT NULL IDENTITY(1,1), "nome" text NOT NULL, "dataNasc" date NOT NULL, "genero" text NOT NULL, "dataConsulta" datetime NOT NULL, "especialidade_id" int, "profissional_id" int, "unidade_id" int, CONSTRAINT "PK_889a9011f1854a60a6aae1c6d80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_a2267c080c51cb41f5bd7917d6" ON "consultas" ("especialidade_id") WHERE "especialidade_id" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_97297577d274e57bf149e07e37" ON "consultas" ("profissional_id") WHERE "profissional_id" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_06a876f32506eca91f119dd02a" ON "consultas" ("unidade_id") WHERE "unidade_id" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profissional" ADD CONSTRAINT "FK_5f7eb92c3cd37cf232bc62c3387" FOREIGN KEY ("especialidade_id") REFERENCES "especialidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profissional" ADD CONSTRAINT "FK_4feee4973405d48043c9a0fc167" FOREIGN KEY ("unidade_id") REFERENCES "unidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD CONSTRAINT "FK_a2267c080c51cb41f5bd7917d69" FOREIGN KEY ("especialidade_id") REFERENCES "especialidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD CONSTRAINT "FK_97297577d274e57bf149e07e378" FOREIGN KEY ("profissional_id") REFERENCES "profissional"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD CONSTRAINT "FK_06a876f32506eca91f119dd02ad" FOREIGN KEY ("unidade_id") REFERENCES "unidades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" DROP CONSTRAINT "FK_06a876f32506eca91f119dd02ad"`);
        await queryRunner.query(`ALTER TABLE "consultas" DROP CONSTRAINT "FK_97297577d274e57bf149e07e378"`);
        await queryRunner.query(`ALTER TABLE "consultas" DROP CONSTRAINT "FK_a2267c080c51cb41f5bd7917d69"`);
        await queryRunner.query(`ALTER TABLE "profissional" DROP CONSTRAINT "FK_4feee4973405d48043c9a0fc167"`);
        await queryRunner.query(`ALTER TABLE "profissional" DROP CONSTRAINT "FK_5f7eb92c3cd37cf232bc62c3387"`);
        await queryRunner.query(`DROP INDEX "REL_06a876f32506eca91f119dd02a" ON "consultas"`);
        await queryRunner.query(`DROP INDEX "REL_97297577d274e57bf149e07e37" ON "consultas"`);
        await queryRunner.query(`DROP INDEX "REL_a2267c080c51cb41f5bd7917d6" ON "consultas"`);
        await queryRunner.query(`DROP TABLE "consultas"`);
        await queryRunner.query(`DROP TABLE "especialidades"`);
        await queryRunner.query(`DROP TABLE "profissional"`);
        await queryRunner.query(`DROP TABLE "unidades"`);
    }

}
