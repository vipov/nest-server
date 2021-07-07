import {MigrationInterface, QueryRunner} from "typeorm";

export class userEntity1625653797001 implements MigrationInterface {
    name = 'userEntity1625653797001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_role_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_entity_roles_user_role_entity" ("userEntityId" integer NOT NULL, "userRoleEntityId" integer NOT NULL, PRIMARY KEY ("userEntityId", "userRoleEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61780684524c974ae0b65a8859" ON "user_entity_roles_user_role_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a1520cdbfdb6f4762ad110100" ON "user_entity_roles_user_role_entity" ("userRoleEntityId") `);
        await queryRunner.query(`DROP INDEX "IDX_61780684524c974ae0b65a8859"`);
        await queryRunner.query(`DROP INDEX "IDX_7a1520cdbfdb6f4762ad110100"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_entity_roles_user_role_entity" ("userEntityId" integer NOT NULL, "userRoleEntityId" integer NOT NULL, CONSTRAINT "FK_61780684524c974ae0b65a88590" FOREIGN KEY ("userEntityId") REFERENCES "user_entity" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_7a1520cdbfdb6f4762ad1101003" FOREIGN KEY ("userRoleEntityId") REFERENCES "user_role_entity" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("userEntityId", "userRoleEntityId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_entity_roles_user_role_entity"("userEntityId", "userRoleEntityId") SELECT "userEntityId", "userRoleEntityId" FROM "user_entity_roles_user_role_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity_roles_user_role_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_entity_roles_user_role_entity" RENAME TO "user_entity_roles_user_role_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_61780684524c974ae0b65a8859" ON "user_entity_roles_user_role_entity" ("userEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7a1520cdbfdb6f4762ad110100" ON "user_entity_roles_user_role_entity" ("userRoleEntityId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_7a1520cdbfdb6f4762ad110100"`);
        await queryRunner.query(`DROP INDEX "IDX_61780684524c974ae0b65a8859"`);
        await queryRunner.query(`ALTER TABLE "user_entity_roles_user_role_entity" RENAME TO "temporary_user_entity_roles_user_role_entity"`);
        await queryRunner.query(`CREATE TABLE "user_entity_roles_user_role_entity" ("userEntityId" integer NOT NULL, "userRoleEntityId" integer NOT NULL, PRIMARY KEY ("userEntityId", "userRoleEntityId"))`);
        await queryRunner.query(`INSERT INTO "user_entity_roles_user_role_entity"("userEntityId", "userRoleEntityId") SELECT "userEntityId", "userRoleEntityId" FROM "temporary_user_entity_roles_user_role_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_user_entity_roles_user_role_entity"`);
        await queryRunner.query(`CREATE INDEX "IDX_7a1520cdbfdb6f4762ad110100" ON "user_entity_roles_user_role_entity" ("userRoleEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_61780684524c974ae0b65a8859" ON "user_entity_roles_user_role_entity" ("userEntityId") `);
        await queryRunner.query(`DROP INDEX "IDX_7a1520cdbfdb6f4762ad110100"`);
        await queryRunner.query(`DROP INDEX "IDX_61780684524c974ae0b65a8859"`);
        await queryRunner.query(`DROP TABLE "user_entity_roles_user_role_entity"`);
        await queryRunner.query(`DROP TABLE "user_role_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
