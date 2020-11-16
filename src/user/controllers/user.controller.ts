import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, SerializeOptions, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { UserRegisterResponseDto, UserRegisterRequestDto, UserLoginRequestDto, UserLoginResponseDto } from '../dto';
import { UserEntity } from '../entities';
import { AuthGuard } from '../guards/auth.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserRole } from '../models';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { UserService } from '../services';
import { AuthService } from '../services/auth.service';
import { ClientProxy, Transport, Client } from '@nestjs/microservices';
import { Observable, of } from 'rxjs';

@Controller('user')
export class UserController {

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) { }

  @Client({ transport: Transport.TCP, options: {port: 3001} })
  client: ClientProxy;

  @Get('sum')
  sum(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const payload = [1, 2, 3];
    return this.client.send<number>(pattern, payload);
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() credentials: UserLoginRequestDto): Promise<UserLoginResponseDto> {

    const user = await this.userService.findByCredentials(credentials.email, credentials.password);

    if (!user) {
      throw new HttpException('ValidationError', HttpStatus.UNAUTHORIZED);
    }

    // const resDto:any = {};

    const resDto = new UserLoginResponseDto();
    resDto.token = await this.authService.tokenSign({ user });
    resDto.user = user;

    return resDto;

    // return {
    //   token: await this.authService.tokenSign({ user }),
    //   user,
    // };
  }

  @Post('register')
  async register(@Body() data: UserRegisterRequestDto): Promise<UserRegisterResponseDto> {
    const user = await this.userService.create(data);

    // TODO handle errors
    return {
      user,
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  // @UseInterceptors(UserInterceptor)
  @ApiBearerAuth()
  getUser(@User() user) {
    return user;
  }

  @Get(':id')
  @ApiParam({name: 'id', type: 'number'})
  async getUserById(@Param('id', UserByIdPipe) user: UserEntity): Promise<UserEntity> {

    return user;
  }

}

// /users/register
// /users/:id([0-9])
// /users/:slug
// /users/:id/photos
// /users/3/photos/2/location/7