import {MigrationInterface, QueryRunner} from "typeorm";

export class fixUserdetailsName1597179420218 implements MigrationInterface {
    name = 'fixUserdetailsName1597179420218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_details" ALTER COLUMN "name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_details" ALTER COLUMN "name" SET NOT NULL`);
    }

}
