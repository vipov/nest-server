import {
  Controller,
  Delete,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RemoveRoleDto } from '../dto/remove-role.dto';
import { UserRoleName } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users-admin')
@ApiTags('Users Admin')
export class UsersAdminController {
  constructor(private usersService: UsersService) {}

  @Post('user/:userId/role/:roleName')
  @ApiParam({ name: 'roleName', enum: UserRoleName })
  @ApiParam({ name: 'userId', type: Number })
  async addRole(
    @Param('userId') userId: string,
    @Param('roleName') roleName: UserRoleName,
  ) {
    const user = await this.usersService.findOne(+userId);
    if (!user) {
      throw new NotFoundException(`User for id "${userId}" not found`);
    }
    return this.usersService.addRole(user.id, roleName);
  }

  @Delete('user/:userId/role/:roleName')
  removeRole(@Param() params: RemoveRoleDto) {
    return this.usersService.removeRole(+params.userId, params.roleName);
  }
}
