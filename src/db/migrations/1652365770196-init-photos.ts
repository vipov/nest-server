import { MigrationInterface, QueryRunner } from "typeorm";

export class initPhotos1652365770196 implements MigrationInterface {
    name = 'initPhotos1652365770196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" varchar, "userId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" varchar, "userId" integer NOT NULL, CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_photo"("id", "filename", "description", "userId") SELECT "id", "filename", "description", "userId" FROM "photo"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`ALTER TABLE "temporary_photo" RENAME TO "photo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME TO "temporary_photo"`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" varchar, "userId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "photo"("id", "filename", "description", "userId") SELECT "id", "filename", "description", "userId" FROM "temporary_photo"`);
        await queryRunner.query(`DROP TABLE "temporary_photo"`);
        await queryRunner.query(`DROP TABLE "photo"`);
    }

}
