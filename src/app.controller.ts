import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {

  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
<<<<<<< HEAD
    const data: string = this.appService.getHello();
    return data;
    // return this.appService.getHello();
=======

    const data: string = this.appService.getHello();

    return data;
>>>>>>> upstream/220509-nest
  }
}
