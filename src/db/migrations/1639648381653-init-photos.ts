import { MigrationInterface, QueryRunner } from 'typeorm';

export class initPhotos1639648381653 implements MigrationInterface {
  name = 'initPhotos1639648381653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "filename" varchar NOT NULL, "description" text)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "photo"`);
  }
}
