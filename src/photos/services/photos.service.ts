import { Injectable } from '@nestjs/common';
import { rename } from 'fs/promises';
import { extname, resolve } from 'path';
import { ConfigService } from '../../config';
import * as sharp from 'sharp';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,
  ) {}

  async create(file: Express.Multer.File) {

    const filename = file.filename + extname(file.originalname).toLowerCase();

    const destFile = resolve(this.config.STORAGE_PHOTOS, filename);

    await rename(file.path, destFile);

    const photo = { filename }

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
