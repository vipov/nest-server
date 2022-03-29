import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';
import { Payload } from '../decorators/payload.decorator';
import { Roles } from '../decorators/roles.decorator';
import { RoleNames, User } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@Roles(RoleNames.ADMIN)
export class AuthController {

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleNames.ROOT)
  me(@Payload('user') user: User) {
    return {
      user
    }
  }
}
