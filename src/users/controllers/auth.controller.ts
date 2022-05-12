import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthRegisterDto, AuthRegisterResponse } from '../dto/auth.dto';
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
}
