import { Body, Controller, Get, HttpException, HttpStatus, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto/auth.dto';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
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

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@Auth() user: User) {
    // TODO tu mozesz zrobic coś, co wymaga zalogowanego usera
    return {
      user
    }
  }
  
}
