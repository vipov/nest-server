import { Body, Controller, Delete, NotFoundException, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserRolesDto } from '../dto/users-admin.dto';
import { Role, RoleNames, User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleByNamePipe } from '../pipes/role-by-name.pipe';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { UserRepository } from '../repositories/user.repository';

@Controller('users-admin')
@ApiTags('UsersAdmin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersAdminController {

  constructor(
    
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  @Post('roles')
  async addRole(
    @Body('userId', UserByIdPipe) user: User,
    @Body('roleName', RoleByNamePipe) role: Role,
    @Body(ValidationPipe) data: UserRolesDto,
  ): Promise<User> {

    user.roles.push(role);

    await this.userRepository.save(user);

    return user;
  }

  @Delete('roles')
  @Roles(RoleNames.ADMIN)
  async removeRole(
    @Body('userId', UserByIdPipe) user: User,
    @Body('roleName', RoleByNamePipe) role: Role,
    @Body(ValidationPipe) data: UserRolesDto,
  ) {

    user.roles = user.roles.filter(role => role.name !== data.roleName);

    await this.userRepository.save(user);

    return user;
  }
}
