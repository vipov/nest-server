import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { PhotosService } from '../photos/services/photos.service';

@Controller('worker')
export class WorkerController {

  constructor(
    private photosService: PhotosService,
  ) {}

  @MessagePattern('sum')
  sum(data: number[]): number {
    console.log('DATA FOR SUM', data);
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern('create_thumbs')
  async createThumbs(filename: string) {
    console.log('create thumbs', filename);
    
    const thumbs = await this.photosService.createThumbs(filename);

    return thumbs;
    
  }
}
