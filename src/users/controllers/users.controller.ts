import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersErrorDto } from '../dto/error.dto';
import { CreateUserDto, RemoveUserResponse, UpdateUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
@ApiResponse({
  status: 500, 
  description: 'Upsss... tego nie przewidzieliśmy',
  type: UsersErrorDto
})
export class UsersController {
  
  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  @ApiQuery({
    name: 'q', 
    required: false, 
    description: 'Wyszukaj usera po mailu lub nazwie',
  })
  async findAll(@Query('q') q: string): Promise<User[]> {
    return this.usersService.findAll(q);
  }

  @Get(':id')
  @ApiResponse({
    status: 404, 
    description: 'Id nie znalezione w bazie',
    type: UsersErrorDto
  })
  async findOne(@Param('id') id: string): Promise<User> {

    const user = await this.usersService.findOne(+id);

    if(!user) {
      throw new NotFoundException(`User o id ${id} nie został znaleziony`)
    }

    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<RemoveUserResponse> {
    const status = await this.usersService.remove(+id);

    return {
      status: status ? 'success' : 'error',
      removedId: id,
    }
  }
}
