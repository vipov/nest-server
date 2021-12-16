import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PhotosApi } from '../app-client/api';
import { PhotosService } from '../photos/services/photos.service';
import { CreateThumbsEvent, SumEvent } from '../worker-client';

@Controller('worker')
export class WorkerController {
  constructor(
    private photosService: PhotosService,
    private phtosApi: PhotosApi,
  ) {}

  @MessagePattern(SumEvent.message)
  accumulate(e: SumEvent): number {
    return e.data.reduce((a, b) => a + b);
  }

  @MessagePattern(CreateThumbsEvent.message)
  async createThumbs(e: CreateThumbsEvent) {
    console.log('CREATE THUMBS', e);
    const thumbs = await this.photosService.createThumbs(e.filename);

    await this.phtosApi.thumbsCreated(thumbs);

    return thumbs;
  }
}
