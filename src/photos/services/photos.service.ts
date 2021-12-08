import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { readdir, rename } from 'fs/promises';
import { extname, join } from 'path';
import * as sharp from 'sharp';
import { ConfigService, joinUrl } from '../../config';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService,
  ) {}

  async create(file: Express.Multer.File) {

    const ext = extname(file.originalname).toLowerCase();

    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    const destFile = join(this.config.STORAGE_PHOTOS, filename);

    await rename(file.path, destFile);

    return {filename}
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
