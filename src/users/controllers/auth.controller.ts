import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(@Body() data: AuthRegisterDto): Promise<AuthRegisterResponse> {

    const user = await this.usersService.create({
      ...data,
      password: this.authService.encodePassword(data.password),
    });

    return {
      user
    }
  }

  @Post('login')
  async login(@Body() credentials: AuthLoginDto): Promise<AuthLoginResponse> {

    const user = await this.authService.findByCredentials(credentials.email, credentials.password);

    if(!user) {
      throw new HttpException('Credentials Invalid', HttpStatus.UNAUTHORIZED);
      // throw new UnauthorizedException({}, 'Credentials Invalid');
    }

    const token = await this.authService.encodeUserToken(user);

    return {token, user};
  }
  
}
