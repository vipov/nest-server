import { Controller, Get, Query, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { ConfigService } from './config';
import { UsersService } from './users/services';
import { Client, ClientProxy, Transport } from "@nestjs/microservices";

@ApiTags('app')
@Controller()
export class AppController {

  @Client({transport: Transport.TCP, options: {port: 3001}})
  client: ClientProxy;

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

  @Get('sum')
  sum(@Query('data') data: string) {
    const numbers = data.split(',').map(v => +v);

    return this.client.send('sum', numbers);
  }
}
