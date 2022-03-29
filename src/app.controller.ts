import { Controller, Get, Optional } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConfigService } from './config';
import { UsersService } from './users/services/users.service';

@Controller()
@ApiTags('App')
export class AppController {

  constructor(
    private config: ConfigService,
    private readonly appService: AppService, 
    @Optional() private usersService: UsersService,
  ) {
    // console.log(this.config)
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
