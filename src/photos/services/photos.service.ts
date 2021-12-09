import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { readdir, rename } from 'fs/promises';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';
import { ConfigService, joinUrl } from '../../config';
import { User } from '../../users/entities/user.entity';
import { Photo } from '../entities/photo.entity';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>
  ) {}

  async create(file: Express.Multer.File, user: User) {

    const ext = extname(file.originalname).toLowerCase();

    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    const destFile = join(this.config.STORAGE_PHOTOS, filename);

    await rename(file.path, destFile);

    const photo = new Photo();
    photo.filename = filename;
    photo.description = file.originalname;
    photo.user = user;

    await this.photoRepository.save(photo);

    return photo;
  }

  async createThumbs(filename: string) {

    const srcFile = join(this.config.STORAGE_PHOTOS, filename);
    const destFile = join(this.config.STORAGE_THUMBS, filename);

    await sharp(srcFile)
      .rotate()
      .resize(200, 200, {fit: 'cover', position: 'attention'})
      .jpeg({quality: 100})
      .toFile(destFile)

    return {
      small: destFile
    }
  }

  async getUserPhotos() {

    const files: string[] = await readdir(this.config.STORAGE_PHOTOS);

    return files.map((photo) => ({
      thumbUrl: joinUrl(this.config.PHOTOS_BASE_PATH, photo),
      downloadUrl: joinUrl(this.config.PHOTOS_DOWNLOAD_PATH, photo),
    }))
  }
}
