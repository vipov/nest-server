import {MigrationInterface, QueryRunner} from "typeorm";

export class photoDesc1648636977024 implements MigrationInterface {
    name = 'photoDesc1648636977024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_photo"("id", "filename") SELECT "id", "filename" FROM "photo"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`ALTER TABLE "temporary_photo" RENAME TO "photo"`);

        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME TO "temporary_photo"`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "photo"("id", "filename") SELECT "id", "filename" FROM "temporary_photo"`);
        await queryRunner.query(`DROP TABLE "temporary_photo"`);
    }

}
