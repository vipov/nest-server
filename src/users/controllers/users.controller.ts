import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable, takeUntil, timer } from 'rxjs';
import {
  CreateUserDto,
  CreateUserResponse,
  UpdateUserDto,
  UpdateUserResponse,
  UsersErrorResponse,
} from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserExceptionFilter } from '../filters/user-exception.filter';
import { PerformanceInterceptor } from '../interceptors/performance.interceptor';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { UsersService } from '../services/users.service';

@Controller('users')
@ApiTags('Users')
@ApiResponse({
  status: 500,
  type: UsersErrorResponse,
  description: 'upss... tego nie przewidzieliśmy',
})
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(PerformanceInterceptor)
// @UseFilters(UserExceptionFilter)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiQuery({ name: 'q', required: false })
  @ApiResponse({ status: 200, type: User, isArray: true })
  async findAll(@Query('q') q: string): Promise<User[]> {
    if (q === 'err') {
      throw new Error('TEST ERROR');
    }
    return this.usersService.findAll(q);
  }

  @Get('search')
  @ApiQuery({ name: 'q', required: false })
  @ApiResponse({ status: 200, type: User, isArray: true })
  search(@Query('q') q: string): Observable<User[]> {
    return new Observable<User[]>((subscriber) => {
      // CONSTRUCTOR
      console.log('CONSTRUCTOR');
      const subscription = setTimeout(() => {
        console.log('COMPOLETE');
        subscriber.next([]);
        subscriber.complete();
      }, 10000);

      return () => {
        // DESTRUCTOR
        // TOTO close database connection / cancel sql query !!!
        console.log('DESTRUCTOR');
        clearTimeout(subscription);
      };
    });
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, type: UsersErrorResponse })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException(`User for "${id}" not found`);
    }

    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<CreateUserResponse> {
    const user = await this.usersService.create(data);

    return {
      user,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    const user = await this.usersService.update(+id, data);

    return { user };
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id', UserByIdPipe) user: User) {
    return this.usersService.remove(user.id);
  }
}
