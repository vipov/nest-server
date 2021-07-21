import { Body, Controller, Get, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto';
import { User } from '../entities';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UsersService } from '../services';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() data: AuthRegisterDto): Promise<AuthRegisterResponse> {

    const user = await this.usersService.create(data);

    return {
      user,
    };
  }

  @Post('login')
  async login(@Body() credentials: AuthLoginDto): Promise<AuthLoginResponse> {

    const user = await this.authService.findByCredentials(credentials.email, credentials.password);

    if (!user) {
      throw new HttpException('ValidationError', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.encodeUserToken(user);

    return {token, user};
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async me(@Auth() user: User): Promise<User> {
    return user;
  }
}
