import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable, of, switchMap, timeout } from 'rxjs';
import { Auth } from '../decorators/auth.decorator';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto/auth.dto';
import { User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('auth')
@ApiTags('Auth')
@UsePipes(new ValidationPipe({transform: true})) 
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

    console.log('DTO',
      credentials, 
      credentials.createdAt.getTime(), 
      credentials instanceof AuthLoginDto , 
      credentials.getName()
    );

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
  @UseInterceptors(ClassSerializerInterceptor)
  me(@Auth() user: User) {
    // TODO tu mozesz zrobic coś, co wymaga zalogowanego usera
    return user;

    // return of(1).pipe(
    //   switchMap(() => this.authService.getUsers())
    // )
  }
  
}
