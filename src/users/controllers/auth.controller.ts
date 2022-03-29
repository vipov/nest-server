import { Body, Controller, Get, Post, UnauthorizedException, UnprocessableEntityException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Payload } from '../decorators/payload.decorator';
import { Roles } from '../decorators/roles.decorator';
import { AuthLoginDto, AuthLoginResponse } from '../dto/auth.dto';
import { RoleNames, User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiTags('Auth')
// @Roles(RoleNames.ADMIN)
export class AuthController {

  constructor( 
    private authService: AuthService,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  // @Roles(RoleNames.ROOT)
  me(@Payload('user') user: User) {
    return {
      user
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({
    transform: false,
    exceptionFactory: (errors) => new UnprocessableEntityException(errors),
  }))
  async login(@Body() data: AuthLoginDto): Promise<AuthLoginResponse> {
    console.log(data);
    const user = await this.authService.validateUser(data.email, data.password);

    if(!user) {
      throw new UnauthorizedException('Credentials Invalid')
    }

    const token = await this.authService.encodeUserToken(user);

    return { token, user }
  }
}
