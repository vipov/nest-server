import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Payload } from '../decorators/payload.decorator';
import { SetRoles } from '../decorators/roles.decorator';
import { CreateUserDto, CreateUserResponse, UpdateUserDto, UpdateUserResponse } from '../dto';
import { Roles, User } from '../entities';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PerformanceInterceptor } from '../interceptors/performance.interceptor';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { UsersService } from '../services';

@ApiTags('users')
@Controller('users')
@SetRoles(Roles.ROOT)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(PerformanceInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

  constructor(
    private usersService: UsersService
  ) {}

  @Get()
  @SetRoles(Roles.ADMIN)
  @ApiQuery({required: false, name: 'q'})
  async findAll(@Query('q') q: string): Promise<User[]> {
    return this.usersService.findAll(q);
  }

  @Get(':id')
  @UsePipes()
  @ApiParam({name: 'id', type: Number})
  findOne(@Param('id', ParseIntPipe) id: number, @Payload('user') user: User) {

    console.log('USER', user)

    return this.usersService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.usersService.create(createUserDto);
    return new CreateUserResponse({user})
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateUserResponse> {

    const user = await this.usersService.update(+id, updateUserDto);

    return {user}
  }

  @Delete(':id')
  @ApiParam({name: 'id', type: Number})
  remove(@Param('id', UserByIdPipe) user: User) {
    
    console.log('USER', user)
    return this.usersService.remove(user.id);
  }
}
