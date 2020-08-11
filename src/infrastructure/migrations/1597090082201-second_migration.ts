import {MigrationInterface, QueryRunner} from "typeorm";

export class secondMigration1597090082201 implements MigrationInterface {
    name = 'secondMigration1597090082201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" RENAME COLUMN "emial" TO "email"`);
        await queryRunner.query(`CREATE TABLE "usuario_details" ("id" SERIAL NOT NULL, "name" character varying(250) NOT NULL, "lastname" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "create_at" TIMESTAMP NOT NULL, "update_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_ceb5f8ea267e44debb4039f3f9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "create_at" TIMESTAMP NOT NULL, "update_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usuarioId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_864857852168a106e1432a4e8a9" PRIMARY KEY ("usuarioId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f66ac2e1d5b12f52c5b94850a1" ON "user_roles" ("usuarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_f66ac2e1d5b12f52c5b94850a19" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_f66ac2e1d5b12f52c5b94850a19"`);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`DROP INDEX "IDX_f66ac2e1d5b12f52c5b94850a1"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "usuario_details"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME COLUMN "email" TO "emial"`);
    }

}
