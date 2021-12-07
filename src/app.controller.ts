import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UsersService } from './users/services/users.service';

@Controller()
@ApiTags('App')
export class AppController {

  constructor(
    private readonly appService: AppService,
    private userService: UsersService,
  ) {}

  @Get()
  getHello(): string {
    // console.log('USER SERVICE', this.userService);
    return this.appService.getHello();
  }
}
