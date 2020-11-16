import { Controller, Post, UseInterceptors, Body, UploadedFile, UseGuards, Get, Param, Res, NotFoundException, ForbiddenException } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiProperty } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../services/photos.service';
import { AuthGuard } from '../../user/guards/auth.guard';
import { User } from '../../user/decorators/user.decorator';
import { UserEntity } from '../../user/entities';
import { PhotoEntity } from '../entities';
import { ConfigService } from '../../config';
import { join } from 'path';
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

  @Post('upload-user-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload user avatar',
    type: FileUploadDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body, @User() user: UserEntity) {

    const avatar = await this.photosService.create(file, user);

    const thumb = await this.photosService.createThumbs(avatar.photo.filename);

    return {avatar, thumb, file, body};
  }

  @Get()
  async getFiles(): Promise<PhotoEntity[]> {

    return this.photosService.findAll();

  }

  @Get('download/:fileName')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async download(@Param('fileName') fileName: string, @Res() res: Response, @User() user: UserEntity) {

    const photo = await this.photosService.getByFileName(fileName);
    
    if(!photo) {
      throw new NotFoundException(`File "${fileName}" not found`);
    }

    if(user.id !== photo.user.id) {
      throw new ForbiddenException(`You don't have permission to file: "${fileName}"`);
    }

    const file = join(this.configService.STORAGE_PHOTOS, fileName)
    res.sendFile(file, function (err) {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
      } else {
        // decrement a download credit, etc.
      }
    })

  }

}
