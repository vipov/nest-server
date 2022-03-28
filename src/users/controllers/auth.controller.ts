import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    return {
      reqPayload: req.payload
    }
  }
}
