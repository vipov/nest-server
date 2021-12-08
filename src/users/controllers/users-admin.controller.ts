import { Controller, Delete, InternalServerErrorException, Param, Post, Req, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Payload } from '../decorators/payload.decorator';
import { Roles } from '../decorators/roles.decorator';
import { User, UserRoleName } from '../entities/user.entity';
import { UserExceptionFilter } from '../filters/user-exception.filter';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';

@Controller('users/admin')
@ApiTags('UsersAdmin')
@UseGuards(JwtAuthGuard)
@Roles(UserRoleName.ROOT)
@ApiBearerAuth()
@UseFilters(UserExceptionFilter)
export class UsersAdminController {

  constructor(
    private usersService: UsersService
  ) {}

  @Post('user/:userId/role/:roleName')
  @ApiParam({name: 'roleName', enum: UserRoleName})
  addRole(@Param('userId') userId: string, @Param('roleName') roleName: UserRoleName, @Auth() user: User) {

    throw new InternalServerErrorException('TEST EXCEPTIOn');

    return this.usersService.addRole(+userId, roleName);

  }

  @Delete('user/:userId/role/:roleName')
  @ApiParam({name: 'roleName', enum: UserRoleName})
  removeRole(@Param('userId') userId: string, @Param('roleName') roleName: UserRoleName, @Payload('user') payload: any) {
    return this.usersService.removeRole(+userId, roleName);

  }
}
