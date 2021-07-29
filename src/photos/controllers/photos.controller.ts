import { Body, Controller, ForbiddenException, Get, NotFoundException, Param, Post, Render, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { access } from 'fs';
import { join } from 'path';
import { ConfigService } from '../../config';
import { Auth } from '../../users/decorators/auth.decorator';
import { User } from '../../users/entities';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';
import { Photo } from '../entities';
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

  
  @Client({transport: Transport.TCP, options: {port: 3001}})
  client: ClientProxy;
  
  constructor(
    private config: ConfigService,
    private photsService: PhotosService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: FileUploadDto})
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async upload(@UploadedFile() file: Express.Multer.File, @Body() data: FileUploadDto, @Auth() user: User) {
    
    const photo = await this.photsService.create(file, user, data);
    // const thumbs = await this.photsService.createThumbs(photo.filename);

    const thumbs = await this.client.send('create_thumbs', photo.filename).toPromise();

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async download(@Param('filename') filename: string, @Res() res: Response, @Auth() user: User) {

    const photo = await this.photsService.findByFilename(filename);

    if(!photo) {
      throw new NotFoundException(`Photo "${filename}" not found`);
    }

    if(photo?.user.id !== user.id) {
      throw new ForbiddenException('Sorry! It is not your photo');
    }

    const file = join(this.config.STORAGE_PHOTOS, filename);

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
