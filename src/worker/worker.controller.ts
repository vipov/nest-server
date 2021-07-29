import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('worker')
export class WorkerController {

  @MessagePattern('sum')
  sum(data: number[]): number {
    console.log('DATA FOR SUM', data);
    return (data || []).reduce((a, b) => a + b);
  }
}
