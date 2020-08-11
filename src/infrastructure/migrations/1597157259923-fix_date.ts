import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDate1597157259923 implements MigrationInterface {
    name = 'fixDate1597157259923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_details" ALTER COLUMN "create_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuario_details" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_59ec073b6c6a8bb9efeadac11ca"`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "create_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "detail_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "update_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_59ec073b6c6a8bb9efeadac11ca" FOREIGN KEY ("detail_id") REFERENCES "usuario_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_59ec073b6c6a8bb9efeadac11ca"`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "create_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "detail_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuario" ALTER COLUMN "create_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_59ec073b6c6a8bb9efeadac11ca" FOREIGN KEY ("detail_id") REFERENCES "usuario_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_details" ALTER COLUMN "update_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "usuario_details" ALTER COLUMN "create_at" DROP DEFAULT`);
    }

}
