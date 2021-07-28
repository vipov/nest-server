import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PhotosService } from '../services/photos.service';

export class FileUploadDto {
  @ApiProperty({type: 'string', format: 'binary'})
  file: any;
}

@ApiTags('photos')
@Controller('photos')
export class PhotosController {

  constructor(
    private photsService: PhotosService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadDto})
  async upload(@UploadedFile() file: Express.Multer.File) {
    
    const photo = await this.photsService.create(file);

    return { photo, file }
  }
}
