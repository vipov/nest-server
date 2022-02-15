import { Controller, Get, NotFoundException, Param, Query, BadRequestException, Post, Body, Patch } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponse, FindUsersDto, UpdateUserDto, UpdateUserResponse, UserErrorResponse } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  // @ApiQuery({ name: 'q', type: String, required: false, description: 'Szukane słowo' })
  async findAll(@Query() query: FindUsersDto): Promise<User[]> {
    const users = await this.usersService.findAll(query.q);

    return users;
  }

  @Get(':id')
  @ApiResponse({ status: 404, type: UserErrorResponse, description: 'User not found error' })
  @ApiResponse({ status: 400, type: UserErrorResponse, description: 'Id is invalid' })
  async findOne(@Param('id') idParam: string): Promise<User> {
    const id = parseInt(idParam, 10);
    if (!id) {
      throw new BadRequestException('Id should be number');
    }
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User for id "${id}" not found`);
    }
    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.usersService.create(data);

    return { user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<UpdateUserResponse> {
    const user = await this.usersService.update(+id, data);

    return { user };
  }
}
