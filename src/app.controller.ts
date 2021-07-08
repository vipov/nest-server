import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy, Client, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { WORKER_SERVICE } from './clients';
import { QuotesService } from './quotes/services';

@Controller()
export class AppController {

  constructor(
    private readonly appService: AppService,
    private quoteService: QuotesService,

    @Inject(WORKER_SERVICE)
    private client: ClientProxy,
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
