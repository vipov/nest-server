import { Body, Controller, Get, HttpException, HttpStatus, Post, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto';
import { User } from '../entities';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService, UsersService } from '../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() data: AuthRegisterDto): Promise<AuthRegisterResponse> {

    data.password = await this.authService.encodePassword(data.password);

    const user = await this.usersService.create(data);

    return { user }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({transform: true}))
  async login(@Body() credentials: AuthLoginDto): Promise<AuthLoginResponse> {

    const user = await this.authService.findByCredentials(credentials.email, credentials.password);

    if(!user) {
      // throw new HttpException("wrong credentials", HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException('Wrong credentials');
    }

    const token = await this.authService.encodeUserToken(user);

    return {token, user};
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  myself(@Auth() user: User) {
    return user;
  }
}
