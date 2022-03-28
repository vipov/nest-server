import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UnprocessableEntityException } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponse, FindUsersDto, UpdateUserDto, UpdateUserResponse, UserErrorResponse } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  // @ApiQuery({ name: 'q', required: false })
  async findAll(@Query() query: FindUsersDto) {
    return this.usersService.findAll(query.q);
  }

  @Get(':id')
  @ApiResponse({status: 404, type: UserErrorResponse, description: 'user not found error'})
  @ApiResponse({status: 422, type: UserErrorResponse, description: 'invalid id param'})
  async findOne(@Param('id') idParam: string) {

    const id = parseInt(idParam, 10);
    if(!id) {
      throw new UnprocessableEntityException('Id param should be number')
    }
    const user = await this.usersService.findOne(id);

    if(!user) {
      throw new NotFoundException(`User for id "${id}" not found`)
    }

    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<CreateUserResponse> {

    const user = await this.usersService.create(data);

    return { user }
  }

  @Patch(':id')
  async update(@Body() data: UpdateUserDto, @Param('id') id: string): Promise<UpdateUserResponse> {
    const user = await this.usersService.update(+id, data);

    return { user }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isDeleted = await this.usersService.remove(+id);
    if(!isDeleted) {
      throw new BadRequestException('Removieng this user is not possible')
    }
    return true;
  }
}
