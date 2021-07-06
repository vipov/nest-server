import { Controller, Post, UseInterceptors, Body, UploadedFile, Get, Render } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../services/photos.service';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@Controller('photos')
export class PhotosController {

  constructor(private photosService: PhotosService) {}

  @Get()
  @Render('photos/index')
  async photos() {
    const photos = await this.photosService.findAll();

    return {photos}
  }

  @Post('upload-user-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload user avatar',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {

    const avatar = await this.photosService.create(file);
    const thumb = await this.photosService.createThumbs(avatar.fileName);

    return {avatar, thumb, file, body};
  }
}
