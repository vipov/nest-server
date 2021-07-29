import { Module } from '@nestjs/common';
import { AppApi } from '../app-client';
import { PhotosModule } from '../photos/photos.module';
import { WorkerController } from './worker.controller';
 
@Module({
  imports: [PhotosModule],
  controllers: [WorkerController],
  providers: [
    {
      provide: AppApi,
      inject: [],
      useFactory: () => {

        return new AppApi({
          basePath: 'http://localhost:3000',
        });
      }
    }
  ]
})
export class WorkerModule {}
