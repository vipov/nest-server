import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  id: number;
  
  @Get()
  getHello(id: undefined | number): string {

    if(id) {
      id.toString();
    }
    // id.toString();

    const data: string =  this.appService.getHello();

    return data;
  }
}
