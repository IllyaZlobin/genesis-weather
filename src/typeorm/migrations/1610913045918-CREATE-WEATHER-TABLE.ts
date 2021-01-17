import {MigrationInterface, QueryRunner} from "typeorm";

export class CREATEWEATHERTABLE1610913045918 implements MigrationInterface {
    name = 'CREATEWEATHERTABLE1610913045918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `weather` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `dt` bigint NOT NULL, `sunrise` bigint NOT NULL, `sunset` bigint NOT NULL, `temp` float NOT NULL, `feels_like` float NOT NULL, `avg_temp` float NOT NULL, `pressure` int NOT NULL, `humidity` int NOT NULL, `clouds` int NOT NULL, `wind_speed` float NOT NULL, `description` varchar(255) NULL, `cityId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `weather` ADD CONSTRAINT `FK_c69617521366df6993ef327f0ad` FOREIGN KEY (`cityId`) REFERENCES `city`(`id`) ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `weather` DROP FOREIGN KEY `FK_c69617521366df6993ef327f0ad`");
        await queryRunner.query("DROP TABLE `weather`");
    }

}
