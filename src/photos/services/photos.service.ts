import { Injectable } from '@nestjs/common';
import { rename } from 'fs/promises';
import { extname, resolve } from 'path';
import { ConfigService } from '../../config';
import * as sharp from 'sharp';
import { User } from '../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Photo } from '../entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoUploadDto } from '../dto/photo.dto';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,

    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>
  ) {}

  async create(file: Express.Multer.File, user: User, data: PhotoUploadDto) {

    const filename = file.filename + extname(file.originalname).toLowerCase();

    const destFile = resolve(this.config.STORAGE_PHOTOS, filename);

    await rename(file.path, destFile);

    const photo = new Photo();
    photo.filename = filename;
    photo.description = data.description;
    photo.user = user;

    await this.photosRepository.save(photo);

    return photo;
  }

  async createThumbs(filename: string) {

    const srcFile = resolve(this.config.STORAGE_PHOTOS, filename);

    // create small thumb
    const smallDestFile = resolve(this.config.STORAGE_THUMBS, filename);

    await sharp(srcFile)
      .rotate()
      .resize(200, 200, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 100})
      .toFile(smallDestFile);

    // TOTO dodac inne wielkosci

    return {
      small: smallDestFile,
    }
  }
}
