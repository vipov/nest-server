import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Payload } from '../decorators/payload.decorator';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto/auth.dto';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PerformanceInterceptor } from '../interceptors/performance.interceptor';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(PerformanceInterceptor)
  getMe(@Payload('user') user: User) {
    return { user };
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: false, skipUndefinedProperties: true }))
  async login(@Body() data: AuthLoginDto): Promise<AuthLoginResponse> {
    const user = await this.authService.validateUser(data.email, data.password);

    console.log('INSTANCE OF AuthLoginDto', data instanceof AuthLoginDto);
    console.log('DATA', data);
    console.log('NAME', data.getName());

    if (!user) {
      throw new UnauthorizedException('Credentails Invalid');
    }

    const token = await this.authService.encodeUserToken(user);

    return { token, user };
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() data: AuthRegisterDto): Promise<AuthRegisterResponse> {
    let [user] = await this.usersService.findBy({ email: data.email });

    console.log('DATA', typeof data.birthday, data.birthday.getTime(), data);

    if (user) {
      throw new BadRequestException('Email already taken');
    }

    const password = await this.authService.encodePassword(data.password);

    user = await this.usersService.create({
      ...data,
      password,
    });

    return { user };
  }
}
