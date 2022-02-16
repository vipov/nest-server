import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RoleNames } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users-admin')
@ApiTags('UsersAdmin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersAdminController {
  @Post('user/:userId/role/:roleName')
  @Roles(RoleNames.ADMIN)
  async addRole(@Auth() user, @Param('userId') userId: string, @Param('roleName') roleName: RoleNames) {
    //TODO handle role add action
    return {
      user,
      roleName,
      userId,
    };
  }

  @Delete('user/:userId/role/:roleName')
  @Roles(RoleNames.ROOT)
  async removeRole(@Auth() user, userId, roleName) {
    //TODO handle role add action
    return {
      user,
      roleName,
      userId,
    };
  }
}
