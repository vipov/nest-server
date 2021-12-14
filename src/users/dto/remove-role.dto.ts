import { UserRoleName } from '../entities/user.entity';

export class RemoveRoleDto {
  userId: string;
  roleName: UserRoleName;
}
