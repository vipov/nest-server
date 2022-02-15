import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConfigService } from './config';
import { AuthService } from './users/services/auth.service';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService, private config: ConfigService) {}

  @Get()
  // @ApiTags('Users')
  getHello(): string {
    // auth service usage
    return this.appService.getHello();
  }

  @Get('sum')
  // @ApiTags('Microservice', 'RPC')
  sum() {
    // auth service usage
    return this.config;
  }
}
