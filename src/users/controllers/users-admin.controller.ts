import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Payload } from '../decorators/payload.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RemoveRoleDto } from '../dto/remove-role.dto';
import { User, UserRoleName } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { UsersService } from '../services/users.service';

@Controller('users-admin')
@ApiTags('Users Admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersAdminController {
  constructor(private usersService: UsersService) {}

  @Post('user/:userId/role/:roleName')
  @ApiParam({ name: 'roleName', enum: UserRoleName })
  @ApiParam({ name: 'userId', type: Number })
  // @Roles(UserRoleName.ADMIN)
  async addRole(
    @Param('userId', UserByIdPipe) user: User,
    @Param('roleName', ValidationPipe) roleName: UserRoleName,
    @Auth() authUser: User,
  ) {
    // const user = await this.usersService.findOne(+userId);
    // if (!user) {
    //   throw new NotFoundException(`User for id "${userId}" not found`);
    // }
    if (user.id !== authUser.id) {
      throw new ForbiddenException(
        'You dont have permissions to add roles for others',
      );
    }
    return this.usersService.addRole(user.id, roleName);
  }

  @Delete('user/:userId/role/:roleName')
  @Roles(UserRoleName.ROOT)
  removeRole(@Param() params: RemoveRoleDto) {
    return this.usersService.removeRole(+params.userId, params.roleName);
  }

}
