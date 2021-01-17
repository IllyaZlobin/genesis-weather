import {MigrationInterface, QueryRunner} from "typeorm";

export class UPDATEWEATHERTABLEFIXDATE1610921767303 implements MigrationInterface {
    name = 'UPDATEWEATHERTABLEFIXDATE1610921767303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `dt`");
        await queryRunner.query("ALTER TABLE `weather` ADD `dt` date NOT NULL");
        await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `sunrise`");
        await queryRunner.query("ALTER TABLE `weather` ADD `sunrise` date NOT NULL");
        await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `sunset`");
        await queryRunner.query("ALTER TABLE `weather` ADD `sunset` date NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `sunset`");
        await queryRunner.query("ALTER TABLE `weather` ADD `sunset` bigint NOT NULL");
        await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `sunrise`");
        await queryRunner.query("ALTER TABLE `weather` ADD `sunrise` bigint NOT NULL");
        await queryRunner.query("ALTER TABLE `weather` DROP COLUMN `dt`");
        await queryRunner.query("ALTER TABLE `weather` ADD `dt` bigint NOT NULL");
    }

}
