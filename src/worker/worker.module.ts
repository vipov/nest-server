import { Module } from '@nestjs/common';
import { config } from 'dotenv';
import { PhotosApi } from '../app-client/api';
import { ConfigModule, ConfigService } from '../config';
import { PhotosModule } from '../photos/photos.module';
import { WorkerController } from './worker.controller';

@Module({
  imports: [PhotosModule, ConfigModule],
  controllers: [WorkerController],
  providers: [
    {
      provide: PhotosApi,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new PhotosApi({ basePath: config.DOMAIN });
      },
    },
  ],
})
export class WorkerModule {}
