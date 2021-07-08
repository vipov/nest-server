import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PhotosApi } from '../app-client';
import { CreateThumbsEvent } from '../clients';
import { PhotosService } from '../photos/services/photos.service';

@Controller()
export class WorkerController {

  constructor(
    private photosService: PhotosService,
    private photosApi: PhotosApi,
  ){}

  @MessagePattern({ cmd: 'sum' })
  accumulate(data: number[]): number {
    console.log('WORKING ON', data)
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern(CreateThumbsEvent.pattern)
  async createThumbs(data: CreateThumbsEvent) {
    console.log('thumbs for', data)
    const file = await this.photosService.createThumbs(data.filename);
    const res = await this.photosApi.thumbsCreated(file);
    console.log('RES', res.data)
  }
}
