import {MigrationInterface, QueryRunner} from "typeorm";
import { Role, Roles } from "../../users/entities";

export class insertRoles1627553161704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const mgr = queryRunner.manager;

        await mgr.create(Role, {name: Roles.ROOT}).save();
        await mgr.create(Role, {name: Roles.ADMIN}).save();
        await mgr.create(Role, {name: Roles.PARTNER}).save();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const mgr = queryRunner.manager;

        await mgr.delete(Role, {name: Roles.ROOT});
        await mgr.delete(Role, {name: Roles.ADMIN});
        await mgr.delete(Role, {name: Roles.PARTNER});
    }

}
