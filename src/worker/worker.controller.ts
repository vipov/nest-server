import { Controller } from '@nestjs/common';
import { MessagePattern } from "@nestjs/microservices";
import { PhotosService } from '../photos/services/photos.service';

@Controller('worker')
export class WorkerController {

  constructor(
    private photosService: PhotosService,
  ) {}

  @MessagePattern('sum')
  add(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }

  @MessagePattern('thumbs')
  thumbs(filename: string) {
    console.log('CREATE THUMB', filename)
    return this.photosService.createThumbs(filename);
  }


}
