import { Body, Controller, HttpException, HttpStatus, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto';
import { User } from '../entities';
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
  @UsePipes(new ValidationPipe({transform: true}))
  async login(@Body() credentials: AuthLoginDto): Promise<AuthLoginResponse> {
    console.log('credentials', credentials)
    const user = await this.authService.findByCredentials(credentials.email, credentials.password);

    if(!user) {
      // throw new HttpException("wrong credentials", HttpStatus.UNAUTHORIZED)
      throw new UnauthorizedException('Wrong credentials');
    }

    const token = await this.authService.encodeUserToken(user);

    return {token, user};
  }
}
