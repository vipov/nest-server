import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UsersService } from './users/services/users.service';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private usersService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('contact')
  contact() {
    return 'Contact page here';
  }
}
