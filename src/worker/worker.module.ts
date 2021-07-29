import { Module } from '@nestjs/common';
import { PhotosModule } from '../photos/photos.module';
import { WorkerController } from './worker.controller';
 
@Module({
  imports: [PhotosModule],
  controllers: [WorkerController]
})
export class WorkerModule {}
