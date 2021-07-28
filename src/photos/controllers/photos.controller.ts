import { Body, Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PhotosService } from '../services/photos.service';

export class FileUploadDto {
  @ApiProperty({type: 'string', format: 'binary'})
  file: any;

  @ApiProperty({type: 'string', required: false})
  description?: string;
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
  async upload(@UploadedFile() file: Express.Multer.File, @Body() data: FileUploadDto) {
    
    const photo = await this.photsService.create(file);
    const thumbs = await this.photsService.createThumbs(photo.filename);

    return { photo, thumbs, file, data }
  }

  @Get()
  @Render('photos/index')
  async index() {

    const photos = await this.photsService.findAll();
    console.log(photos) 
    return {
      photos,
      message: 'Hello to photos module :)'
    }
  }
}
