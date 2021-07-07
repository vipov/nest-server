import {MigrationInterface, QueryRunner} from "typeorm";

export class photosEntity1625647693019 implements MigrationInterface {
    name = 'photosEntity1625647693019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" text, "size" integer)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "photo_entity"`);
    }

}
