import {MigrationInterface, QueryRunner} from "typeorm";

export class initPhotos1648635273447 implements MigrationInterface {
    name = 'initPhotos1648635273447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
