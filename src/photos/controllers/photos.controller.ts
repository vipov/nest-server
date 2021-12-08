import { Body, Controller, Get, Post, Render, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from '../dto/photos.dto';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
@ApiTags('Photos')
export class PhotosController {

  constructor(
    private photosService: PhotosService,
  ) {}

  @Get()
  @Render('photos/index')
  index() {
    const photos = [
      {
        thumbPath: '/thumbs/956b5bbcb612874d74ae58d5d88c2e99.png',
        downloadPath: '/photos/download/956b5bbcb612874d74ae58d5d88c2e99.png'
      },
      {
        thumbPath: '/thumbs/956b5bbcb612874d74ae58d5d88c2e99.png',
        downloadPath: '/photos/download/956b5bbcb612874d74ae58d5d88c2e99.png'
      },
    ]

    return {photos};
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadDto})
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {

    const photo = await this.photosService.create(file);

    const thumbs = await this.photosService.createThumbs(photo.filename);

    return {file, body, thumbs};
  }
}
