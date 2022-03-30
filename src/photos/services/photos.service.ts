import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { rename } from 'fs/promises';
import { extname, join, resolve } from 'path';
import { ConfigService } from '../../config';
import * as sharp from 'sharp';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,
  ) {}

  async create(file: Express.Multer.File) {

    // create new file name
    const ext = extname(file.originalname).toLowerCase();
    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    // move from tmp to storage
    const destFile = join(this.config.STORAGE_PHOTOS, filename);
    await rename(file.path, destFile);

    // TODO create database record

    return { filename }
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
}
