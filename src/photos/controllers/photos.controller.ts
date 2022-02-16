import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PhotoUploadDto } from '../dto/photos.dto';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
@ApiTags('Photos')
export class PhotosController {
  constructor(private photosService: PhotosService) {}
  /**
   * upload photo handler
   */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: PhotoUploadDto })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() data: PhotoUploadDto) {
    const photo = await this.photosService.create(file);
    return { file, data, photo };
  }
}
