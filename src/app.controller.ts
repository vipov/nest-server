import { Controller, Get, Param } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { QuotesService } from './quotes/services';

@Controller()
export class AppController {

  @Client({transport: Transport.TCP, options: {port: 3001}})
  client: ClientProxy;

  constructor(
    private readonly appService: AppService,
    private quoteService: QuotesService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('sum/:numbers')
  sum(@Param('numbers') numbers: string): Observable<number> {

    const payload = numbers.split(',').map(n => parseInt(n, 10));
    const pattern = {cmd: 'sum'};

    const r = this.client.send<number>(pattern, payload);
    console.log('R', r, payload)
    return r;
  }
}
