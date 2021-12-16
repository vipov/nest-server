import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UsersService } from './users/services/users.service';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { SumEvent } from './worker-client';

@Controller()
@ApiTags('App')
export class AppController {
  @Client({ transport: Transport.TCP, options: { port: 3001 } })
  client: ClientProxy;

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

  @Get('sum/:numbers')
  sum(@Param('numbers') data: string) {
    const numbers = data.split(',').map((v) => +v);
    const event: SumEvent = { data: numbers };
    return this.client.send(SumEvent.message, event);
  }
}
