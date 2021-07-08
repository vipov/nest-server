import { Module } from '@nestjs/common';
import { Configuration, PhotosApi } from '../app-client';
import { DbModule } from '../db/db.module';
import { PhotosModule } from '../photos/photos.module';
import { WorkerController } from './worker.controller';

@Module({
  imports: [PhotosModule, DbModule],
  controllers: [WorkerController],
  providers: [
    {
      provide: PhotosApi,
      inject: [],
      useFactory: () => {
        const config: Configuration = {
          basePath: 'http://localhost:3000',
          // apiKey: 'TODO ustawic token z AuthService'
        }
        return new PhotosApi(config);
      }
    }
  ]
})
export class WorkerModule {}
