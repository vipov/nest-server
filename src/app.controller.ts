import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './users/services/auth.service';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  // @ApiTags('Users')
  getHello(): string {
    // auth service usage
    return this.appService.getHello();
  }

  @Get('sum')
  // @ApiTags('Microservice', 'RPC')
  sum(): string {
    // auth service usage
    return this.appService.getHello();
  }
}
