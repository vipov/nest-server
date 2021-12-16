import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserRole, UserRoleName } from '../../users/entities/user.entity';

export class addUserRoleRecords1639654373589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const admin = UserRole.create({ name: UserRoleName.ADMIN });
    await admin.save();
    const root = UserRole.create({ name: UserRoleName.ROOT });
    await root.save();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM user_role WHERE name=?', [
      UserRoleName.ADMIN,
    ]);
    await queryRunner.query('DELETE FROM user_role WHERE name=?', [
      UserRoleName.ROOT,
    ]);
  }
}
