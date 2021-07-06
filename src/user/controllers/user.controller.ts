import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiParam } from '@nestjs/swagger';
import { TimeoutException } from '../../shared/http-exception.filter';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import {
  UserRegisterResponseDto,
  UserRegisterRequestDto,
  UserLoginRequestDto,
  UserLoginResponseDto,
} from '../dto';
import { UserEntity, UserRole } from '../entities';
import { AuthGuard } from '../guards/auth.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
import { UserByIdPipe } from '../pipes/user-by-id.pipe';
import { AuthService } from '../services';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: UserRegisterResponseDto })
  async register(
    @Body() data: UserRegisterRequestDto,
  ): Promise<UserRegisterResponseDto> {
    const user = await this.userService.create(data);
    // TODO handle errors
    return {
      user,
    };
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(
    @Body() credentials: UserLoginRequestDto,
  ): Promise<UserLoginResponseDto> {
    const user = await this.userService.findByCredentials(
      credentials.email,
      credentials.password,
    );

    if (!user) {
      throw new HttpException('ValidationError', HttpStatus.UNAUTHORIZED);
    }
    return {
      token: await this.authService.tokenSign({ user }),
      user,
      credentials,
    } as any;
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @ApiBearerAuth()
  getUser(@User() user: UserEntity) {
    console.log('CONTROLLER: UserController.getUser()');
    return { user };
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number })
  async getUserById(
    @Param('id', UserByIdPipe) user: UserEntity,
    @User() authUser,
  ) {
    console.log('CONTROLLER');

    // const err =  new TimeoutException('Testowy wyjątek', 400);
    // err.timeout = 4000;
    // throw err;

    return user;
  }
}
