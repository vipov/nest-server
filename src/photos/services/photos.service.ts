import { Injectable } from '@nestjs/common';
import { extname, join } from 'path';
import { ConfigService, joinUrl } from '../../config';
import { readdir, rename } from 'fs/promises';
import { createHash } from 'crypto';
import * as sharp from 'sharp';
import { Photo } from '../entities/photo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class PhotosService {
  constructor(
    private config: ConfigService,

    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(file: Express.Multer.File, user: User) {
    const ext = extname(file.originalname).toLowerCase();

    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    const destFile = join(this.config.STORAGE_PHOTOS, filename);

    await rename(file.path, destFile);

    const photo = new Photo();
    photo.filename = filename;
    photo.description = file.originalname;
    // photo.user = user.id as any;
    photo.user = user;

    await this.photoRepository.save(photo);

    return photo;
  }

  async createThumbs(filename: string) {
    const srcFile = join(this.config.STORAGE_PHOTOS, filename);
    const destFile = join(this.config.STORAGE_THUMBS, filename);

    await sharp(srcFile)
      .rotate()
      .resize(200, 200, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 100 })
      .toFile(destFile);

    return {
      small: destFile,
    };
  }

  async getUserPhotos() {
    // const files: string[] = await readdir(this.config.STORAGE_PHOTOS);
    const photos = await this.photoRepository.find();

    const files: string[] = photos.map((photo) => photo.filename);

    return files.map((photo) => ({
      thumbUrl: joinUrl(this.config.PHOTOS_BASE_PATH, photo),
      downloadUrl: joinUrl(this.config.PHOTOS_DOWNLOAD_PATH, photo),
    }));
  }
}
