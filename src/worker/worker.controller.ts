import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateThumbsEvent } from '../clients';
import { PhotosService } from '../photos/services/photos.service';

@Controller()
export class WorkerController {

  constructor(private photosService: PhotosService){}

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('WORKING ON', data)
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern(CreateThumbsEvent.pattern)
  createThumbs(data: CreateThumbsEvent) {
    console.log('thumbs for', data)
    return this.photosService.createThumbs(data.filename);
  }
}
