import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import {
  AuthLoginDto,
  AuthLoginResponse,
  AuthRegisterDto,
  AuthRegisterResponse,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: AuthRegisterDto): Promise<AuthRegisterResponse> {
    let [user] = await this.usersService.findBy({ email: data.email });
    if (user) {
      throw new BadRequestException(`Adres ${data.email} jest juz zajety`);
    }
    const password = await this.authService.encodePassword(data.password);
    user = await this.usersService.create({
      ...data,
      password,
    });
    return { user };
  }

  /* 
  definicja routingu
  pipe - walidacja
  pobranie z body data
  authService.ValidateUser (sprawdza, czy user istnieje, taki find())
  jak nie ma usera to throw error
  jak jest ok wygenerowac token
  zwrocic dto
  */
  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() data: AuthLoginDto): Promise<AuthLoginResponse> {
    const user = await this.authService.validateUser(data.email, data.password);

    if (!user) {
      throw new BadRequestException(`Uzytkownik ${data.email} nie istnieje`);
    }

    // tutaj mozna rozszerzyc. zeby nie wpuszczac zablokowanych userow, albo
    // userow, ktorym wygasla subsbkrybcja

    const token = await this.authService.encodeUserToken(user);
    return { user, token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  me(@Auth() user:User) {
      return user;
  }
}
