import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  @ApiResponse({ status: 200, type: User, isArray: true })
  async findAll(@Query('q') q: string): Promise<User[]> {
    return this.usersService.findAll(q);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User })
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}
