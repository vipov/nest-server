import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto';
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
    
    const user = await this.usersService.create(data);

    return { user }
  }

  @Post('login')
  async login(@Body() credentials: AuthLoginDto): Promise<AuthLoginResponse> {

    const user = await this.authService.findByCredentials(credentials.email, credentials.password);

    if(!user) {
      // throw new HttpException("wrong credentials", HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException('Wrong credentials');
    }

    const token = await this.authService.encodeUserToken(user);

    return {token, user};
  }
}
