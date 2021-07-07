import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class WorkerController {

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('WORKING ON', data)
    return (data || []).reduce((a, b) => a + b);
  }
}
