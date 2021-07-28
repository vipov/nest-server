import { Injectable } from '@nestjs/common';
import { rename } from 'fs';
import { promisify } from "util";
const renameAsync = promisify(rename);
import { join, extname } from 'path';
import { ConfigService } from '../../config';
import { createHash } from 'crypto';
import * as sharp from 'sharp';

@Injectable()
export class PhotosService {

  constructor(
    private config: ConfigService
  ) {}

  async create(file: Express.Multer.File) {

    const ext = extname(file.originalname).toLocaleLowerCase()

    const filename = createHash('md5').update(file.path).digest('hex') + ext;

    const destFile = join(this.config.STORAGE_PHOTOS, filename);

    await renameAsync(file.path, destFile);

    return {filename};
  }

  async createThumbs(filename: string) {

    const srcFile = join(this.config.STORAGE_PHOTOS, filename);
    const destFile = join(this.config.STORAGE_THUMBS, filename);

    await sharp(srcFile)
      .rotate()
      .resize(200, 200, {fit: 'cover', position: 'attention'})
      .jpeg({quality: 100})
      .toFile(destFile);

    return {
      small: destFile
    }
  }
}
