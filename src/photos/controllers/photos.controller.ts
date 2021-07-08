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
  UseGuards,
  ClassSerializerInterceptor,
  ForbiddenException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotosService } from '../services/photos.service';
import { join } from 'path';
import { User } from '../../user/decorators/user.decorator';
import { UserEntity } from '../../user/entities';
import { ConfigService } from '../../config';
import { Response } from 'express';
import { AuthGuard } from '../../user/guards/auth.guard';
import { ThumbsCreatedDto, ThumbsCreatedResponseDto, UploadResponseDto } from '../dto';
import { PhotoEntity } from '../entities';
import { ClientProxy } from '@nestjs/microservices';
import { CreateThumbsEvent, WORKER_SERVICE } from '../../clients';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  
  constructor(
    private photosService: PhotosService,
    private configService: ConfigService,
    @Inject(WORKER_SERVICE)
    private workerClient: ClientProxy,
  ) {}

  @Get()
  @Render('photos/index')
  async photos() {
    const photos = await this.photosService.findAll();
    return { photos };
  }

  @Post('upload-user-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload user avatar',
    type: FileUploadDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body, @User() user: UserEntity) {

    const avatar = await this.photosService.create(file, user);
    // const thumb = await this.photosService.createThumbs(avatar.fileName);
    console.log('THUMB SEND TO SERVICE')
    this.workerClient.send<any, CreateThumbsEvent>(CreateThumbsEvent.pattern, {filename: avatar.fileName})
    .toPromise().then(res => console.log('THUM SERVICE RESPONSE', res));
    
    return new UploadResponseDto({ 
      photo: avatar.photo, 
      // thumb, 
      file, 
      body 
    });
  }

  @Get('download/:fileName')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async download(@Param('fileName') filename: string, @Res() res: Response, @User() user: UserEntity) {

    const photo = await PhotoEntity.findOne({filename});

    if(!photo) {
      throw new NotFoundException('Photo not found: '+filename);
    }

    if (!photo.user || photo.user.id !== user.id) {
      throw new ForbiddenException("Sorry! You can't see that.")
    }

    const file = join(this.configService.STORAGE_PHOTOS, filename)

    res.download(file, filename, function (err) {
      if (err) {
        // Handle error, but keep in mind the response may be partially-sent
        // so check res.headersSent
      } else {
        // decrement a download credit, etc.
      }
    })

    // jeśli nie chcesz by przeglądarka zrobiła prompt na download to użyj: res.sendFile()
  }

  @Post('thumbs-created')
  @ApiOperation({operationId: 'thumbsCreated'})
  thumbsCreated(@Body() data: ThumbsCreatedDto): ThumbsCreatedResponseDto {
    console.log('THUMBS CREATED', data);
    this.photosService.sendToChat({message: 'Thumb created: '+data.thumbName, sender: 'Microservice'})
    return {message: 'Dziękuję :)'}
  }
}
