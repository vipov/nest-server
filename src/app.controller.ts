import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConfigService } from './config';
import { UsersService } from './users/services';

@ApiTags('app')
@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private usersService: UsersService,
    private config: ConfigService,
    ) {
      // console.log('CONFIG', config);
    }

  @Get()
  getHello(): string {
    //
    return this.appService.getHello();
  }

  @Get('chat')
  @Render('chat')
  chat() {
    
  }
}
