import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { readdir, rename } from 'fs/promises';
import { extname, join, resolve } from 'path';
import { ConfigService, joinUrl } from '../../config';
import * as sharp from 'sharp';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoUploadDto } from '../dto/photos.dto';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>
  ) {}

  async create(file: Express.Multer.File, data: PhotoUploadDto, user: User) {

    // create new file name
    const ext = extname(file.originalname).toLowerCase();
    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    // move from tmp to storage
    const destFile = join(this.config.STORAGE_PHOTOS, filename);
    await rename(file.path, destFile);

    // create database record
    const photo = new Photo();
    photo.filename = filename;
    photo.description = data.description;
    await this.photoRepository.save(photo);

    return photo;
  }

  async createThumbs(filename: string) {
    const srcFile = resolve(this.config.STORAGE_PHOTOS, filename);
    const destFile = resolve(this.config.STORAGE_THUMBS, filename);

    await sharp(srcFile)
      .rotate()
      .resize(200, 200, { fit: 'cover' })
      .jpeg({ quality: 100 })
      .toFile(destFile)

    return { 
      small: destFile,
    }
  }

  async getPhotos() {
    const files: string[] = await readdir(this.config.STORAGE_PHOTOS);

    return files.map((photo) => ({
      thumbUrl: joinUrl(this.config.PHOTOS_BASE_PATH, photo),
      downloadUrl: joinUrl(this.config.PHOTOS_DOWNLOAD_PATH, photo),
    }))
  }
}
