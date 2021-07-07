import { Module } from '@nestjs/common';
import { WorkerController } from './worker.controller';

@Module({
  imports: [],
  controllers: [WorkerController]
})
export class WorkerModule {}
