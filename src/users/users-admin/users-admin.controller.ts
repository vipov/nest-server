import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { UserRolesDto } from '../dto/users-admin.dto';
import { Role, RoleNames, User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
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
  async addRole(@Body() data: UserRolesDto): Promise<User> {

    const role = await this.roleRepository.findOneBy({ name: data.roleName });

    const user = await this.userRepository.findOneBy({ id: data.userId});

    user.roles.push(role);

    await this.userRepository.save(user);

    return user;
  }

  @Delete('roles')
  @Roles(RoleNames.ADMIN)
  async removeRole(@Body() data: UserRolesDto) {

    return data;
  }
}
