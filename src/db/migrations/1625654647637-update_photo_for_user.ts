import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePhotoForUser1625654647637 implements MigrationInterface {
    name = 'updatePhotoForUser1625654647637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_photo_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" text, "size" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_photo_entity"("id", "filename", "description", "size") SELECT "id", "filename", "description", "size" FROM "photo_entity"`);
        await queryRunner.query(`DROP TABLE "photo_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_photo_entity" RENAME TO "photo_entity"`);
        await queryRunner.query(`CREATE TABLE "temporary_photo_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" text, "size" integer, "userId" integer, CONSTRAINT "FK_19cd6e42249b6491818b06a550e" FOREIGN KEY ("userId") REFERENCES "user_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_photo_entity"("id", "filename", "description", "size", "userId") SELECT "id", "filename", "description", "size", "userId" FROM "photo_entity"`);
        await queryRunner.query(`DROP TABLE "photo_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_photo_entity" RENAME TO "photo_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo_entity" RENAME TO "temporary_photo_entity"`);
        await queryRunner.query(`CREATE TABLE "photo_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" text, "size" integer, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "photo_entity"("id", "filename", "description", "size", "userId") SELECT "id", "filename", "description", "size", "userId" FROM "temporary_photo_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_photo_entity"`);
        await queryRunner.query(`ALTER TABLE "photo_entity" RENAME TO "temporary_photo_entity"`);
        await queryRunner.query(`CREATE TABLE "photo_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" text, "size" integer)`);
        await queryRunner.query(`INSERT INTO "photo_entity"("id", "filename", "description", "size") SELECT "id", "filename", "description", "size" FROM "temporary_photo_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_photo_entity"`);
    }

}
