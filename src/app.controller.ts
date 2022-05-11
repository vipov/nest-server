import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('App')
export class AppController {
<<<<<<< HEAD
  constructor(private readonly appService: AppService) {}
=======

  constructor(
    private appService: AppService
  ) {}
>>>>>>> upstream/220509-nest

  @Get()
  getHello(): string {
    const data: string = this.appService.getHello();

    return data;
  }
}
