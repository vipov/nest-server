import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SumEvent } from '../worker-client';

@Controller('worker')
export class WorkerController {
  @MessagePattern(SumEvent.message)
  accumulate(e: SumEvent): number {
    return e.data.reduce((a, b) => a + b);
  }
}
