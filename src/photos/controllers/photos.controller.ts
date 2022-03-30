import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { ConfigService } from '../../config';
import { Auth } from '../../users/decorators/auth.decorator';
import { User } from '../../users/entities/user.entity';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';
import { PhotoUploadDto } from '../dto/photos.dto';
import { IsImagePipe } from '../pipes/is-image.pipe';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
@ApiTags('Photos')
export class PhotosController {

  constructor(
    private photosService: PhotosService,
    private config: ConfigService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async upload(
    @UploadedFile(new IsImagePipe({type: 'image'})) file: Express.Multer.File, 
    @Body() data: PhotoUploadDto,
    @Auth() user: User,
  ) {

    const photo = await this.photosService.create(file, data, user);

    const thumbs = await this.photosService.createThumbs(photo.filename);

    return { file, data, photo, thumbs }
  }


 // /photos/download/../../../etc/nginx/passwords.config !!!
  @Get('download/:filename')
  async download(@Param('filename') filename: string, @Res() res: Response) {
    
    const file = join(this.config.STORAGE_PHOTOS, filename);

    res.download(file, filename, function(err) {
      // TODO handle error & success
    });

    // res.sendFile()
  }
}
