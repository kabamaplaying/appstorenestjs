import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserdetailsMigration1597090506054 implements MigrationInterface {
    name = 'fixUserdetailsMigration1597090506054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" ADD "detail_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "UQ_59ec073b6c6a8bb9efeadac11ca" UNIQUE ("detail_id")`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_59ec073b6c6a8bb9efeadac11ca" FOREIGN KEY ("detail_id") REFERENCES "usuario_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_59ec073b6c6a8bb9efeadac11ca"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "UQ_59ec073b6c6a8bb9efeadac11ca"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP COLUMN "detail_id"`);
    }

}
