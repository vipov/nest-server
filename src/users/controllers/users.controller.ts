import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponse, UpdateUserDto, UpdateUserResponse } from '../dto';
import { User } from '../entities';
import { UsersService } from '../services';

@ApiTags('users')
@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  @ApiQuery({required: false, name: 'q'})
  async findAll(@Query('q') q: string): Promise<User[]> {
    return this.usersService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.usersService.create(createUserDto);
    return {user}
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {

    const user = await this.usersService.update(+id, updateUserDto);

    return {user}
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
