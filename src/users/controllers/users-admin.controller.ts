import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { UserRoleName } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users/admin')
export class UsersAdminController {

  constructor(
    private usersService: UsersService
  ) {}

  @Post('user/:userId/role/:roleName')
  @ApiParam({name: 'roleName', enum: UserRoleName})
  addRole(@Param('userId') userId: number, @Param('roleName') roleName: UserRoleName) {

    return this.usersService.addRole(+userId, roleName);

  }

  @Delete('user/:userId/role/:roleName')
  @ApiParam({name: 'roleName', enum: UserRoleName})
  removeRole(@Param('userId') userId: number, @Param('roleName') roleName: UserRoleName) {

    return this.usersService.removeRole(+userId, roleName);

  }
}
