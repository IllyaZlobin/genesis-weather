import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATECITYTABLE1610905697385 implements MigrationInterface {
  name = 'CREATECITYTABLE1610905697385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `city` (`id` int NOT NULL AUTO_INCREMENT, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `name` varchar(255) NOT NULL, `latitude` float NOT NULL, `longitude` float NOT NULL, UNIQUE INDEX `IDX_f8c0858628830a35f19efdc0ec` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_f8c0858628830a35f19efdc0ec` ON `city`',
    );
    await queryRunner.query('DROP TABLE `city`');
  }
}
