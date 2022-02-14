import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './users/services/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    // auth service usage
    return this.appService.getHello();
  }
}
