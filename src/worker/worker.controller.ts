import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PhotosService } from '../photos/services/photos.service';
import { CreateThumbsEvent, SumEvent } from '../worker-client';

@Controller('worker')
export class WorkerController {
  constructor(private photosService: PhotosService) {}

  @MessagePattern(SumEvent.message)
  accumulate(e: SumEvent): number {
    return e.data.reduce((a, b) => a + b);
  }

  @MessagePattern(CreateThumbsEvent.message)
  async createThumbs(e: CreateThumbsEvent) {
    console.log('CREATE THUMBS', e);
    const thumbs = await this.photosService.createThumbs(e.filename);

    return thumbs;
  }
}
