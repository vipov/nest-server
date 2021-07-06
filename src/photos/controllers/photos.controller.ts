import {
  Controller,
  Post,
  UseInterceptors,
  Body,
  UploadedFile,
  Get,
  Render,
  Param,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../services/photos.service';
import { join } from 'path';
import { User } from '../../user/decorators/user.decorator';
import { UserEntity } from '../../user/entities';
import { ConfigService } from '../../config';
import { Response } from 'express';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@Controller('photos')
export class PhotosController {
  constructor(
    private photosService: PhotosService,
    private configService: ConfigService,
  ) {}

  @Get()
  @Render('photos/index')
  async photos() {
    const photos = await this.photosService.findAll();
    console.log(photos);
    return { photos };
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

    return { avatar, thumb, file, body };
  }

  @Get('download/:fileName')
  async download(
    @Param('fileName') filename: string,
    @Res() res: Response,
    @User() user: UserEntity,
  ) {
    const file = join(this.configService.STORAGE_PHOTOS, filename);

    res.download(file, filename, function (err) {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
      } else {
        // decrement a download credit, etc.
      }
    });

    // jeśli nie chcesz by przeglądarka zrobiła prompt na download to użyj: res.sendFile()
  }
}
