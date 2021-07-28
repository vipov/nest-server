import { Body, Controller, Get, NotFoundException, Param, Post, Render, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { access } from 'fs';
import { join } from 'path';
import { ConfigService } from '../../config';
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
    private config: ConfigService,
    private photsService: PhotosService,
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

    return {
      photos,
      message: 'Hello to photos module :)'
    }
  }

  @Get('download/:filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {

    const file = join(this.config.STORAGE_PHOTOS, filename)

    access(file, err => {

      if(err) {

        res.status(404).send('Not found: '+filename)
        
      } else {
        res.download(file, filename, (err) => {
          // TODO handle error OR success
        })
      }
    })

  }
}
