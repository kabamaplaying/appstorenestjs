import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1597076886629 implements MigrationInterface {
    name = 'firstMigration1597076886629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "emial" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "create_at" TIMESTAMP NOT NULL, "update_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_6ccff37176a6978449a99c82e10" UNIQUE ("username"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
