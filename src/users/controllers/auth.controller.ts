import { BadRequestException, Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Roles } from '../decorators/roles.decorator';
import { AuthLoginDto, AuthLoginResponse, AuthRegisterDto, AuthRegisterResponse } from '../dto/auth.dto';
import { RoleNames, User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() data: AuthRegisterDto): Promise<AuthRegisterResponse> {

    let [user] = await this.usersService.findBy({email: data.email});

    if(user) {
      throw new BadRequestException(`Adres ${data.email} jest już zajęty`);
    }

    const password = await this.authService.encodePassword(data.password);

    user = await this.usersService.create({
      ...data,
      password,
    });

    return { user };
  }

  /**
   * - definicja routing
   * - ddanie walidacji
   * - pobranie body data
   * - authService.validateUser
   * - jak nie ma usera to throw error
   * - wygenerowac token
   * - zwrocic dto
   */
   @Post('login')
   @UsePipes(ValidationPipe)
   async login(@Body() data: AuthLoginDto): Promise<AuthLoginResponse> {

     const user = await this.authService.validateUser(data.email, data.password);
 
     if (!user) {
       throw new BadRequestException(`Uzytkownik ${data.email} nie istnieje`);
     }
 
     const token = await this.authService.encodeUserToken(user);

     return { token, user };
   }
 
   @Get('me')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @Roles(RoleNames.ADMIN)
   me(@Auth() user: User) {
    return user;
   }
}
