import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UnprocessableEntityException } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, CreateUserResponse, FindUsersDto, UpdateUserDto, UpdateUserResponse, UserErrorResponse } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
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
  @ApiParam({name: 'id', type: Number})
  @ApiResponse({status: 404, type: UserErrorResponse, description: 'user not found error'})
  @ApiResponse({status: 422, type: UserErrorResponse, description: 'invalid id param'})
  
  findOneWithPipe(@Param('id', UserByIdPipe) user: User) {
    return user;
  }

  // stara wersja bez pipe
  async findOne(@Param('id', ParseIntPipe) id: number) {

    // const id = parseInt(idParam, 10);

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
