import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { rename } from 'fs/promises';
import { extname, join } from 'path';
import { ConfigService } from '../../config';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,
  ) {}

  async create(file: Express.Multer.File) {
    // TODO validate if this is a image file

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

    return {}
  }
}
