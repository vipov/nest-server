import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RoleNames, User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';

@Controller('users-admin')
@ApiTags('UsersAdmin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersAdminController {
  @Post('user/:userId/role/:roleName')
  @Roles(RoleNames.ADMIN)
  async addRole(@Auth() authUser, @Param('userId', UserByIdPipe) user: User, @Param('roleName') roleName: RoleNames) {
    //TODO handle role add action
    return {
      authUser,
      roleName,
      user,
    };
  }

  @Delete('user/:userId/role/:roleName')
  @Roles(RoleNames.ROOT)
  @ApiParam({ name: 'userId', type: Number })
  @ApiParam({ name: 'roleName', enum: RoleNames })
  async removeRole(@Auth() authUser, @Param('userId', UserByIdPipe) user: User, @Param('roleName') roleName: RoleNames) {
    //TODO handle role add action
    return {
      authUser,
      roleName,
      user,
    };
  }
}
