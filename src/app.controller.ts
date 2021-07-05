import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { QuotesService } from './quotes/services';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private quoteService: QuotesService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
