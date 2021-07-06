import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { UserRegisterResponseDto, UserRegisterRequestDto, UserLoginRequestDto, UserLoginResponseDto } from '../dto';
import { UserEntity, UserRole } from '../entities';
import { AuthGuard } from '../guards/auth.guard';
import { UserInterceptor } from '../interceptors/user.interceptor';
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
  async login(@Body() credentials: UserLoginRequestDto): Promise<UserLoginResponseDto> {

    const user = await this.userService.findByCredentials(credentials.email, credentials.password);

    if (!user) {
      throw new HttpException('ValidationError', HttpStatus.BAD_REQUEST);
    }
    return {
      token: await this.authService.tokenSign({user}),
      user,
    };
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard)
  @UseInterceptors(UserInterceptor)
  @ApiBearerAuth()
  getUser(@User() user: UserEntity) {
    console.log('CONTROLLER: UserController.getUser()')
    return {user};
  }

}
