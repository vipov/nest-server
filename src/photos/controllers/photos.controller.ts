import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Auth } from '../../users/decorators/auth.decorator';
import { User } from '../../users/entities/user.entity';
import { JwtAuthGuard } from '../../users/guards/jwt-auth.guard';
import { PhotoUploadDto } from '../dto/photo.dto';
import { IsImagePipe } from '../pipes/is-image.pipe';
import { PhotosService } from '../services/photos.service';

@Controller('photos')
@ApiTags('Photos')
export class PhotosController {

  constructor(
    private photosService: PhotosService,
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async upload(
    @Body() data: PhotoUploadDto,
    @UploadedFile(IsImagePipe) file: Express.Multer.File,
    @Auth() user: User,
  ) {

    const photo = await this.photosService.create(file, user, data);

    const thumbs = await this.photosService.createThumbs(photo.filename)

    return {
      photo,
      thumbs,
      file,
      user,
      data,
    }
  }
}
