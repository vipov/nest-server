import { Injectable } from '@nestjs/common';
import { promisify } from 'util';
import { rename, readdir } from 'fs';
import { extname, join } from 'path';
const renameAsync = promisify(rename);
const readdirAsync = promisify(readdir);
import * as crypto from 'crypto';
import { ConfigService } from '../../config';
import { resolve } from 'path';
import * as sharp from 'sharp';

@Injectable()
export class PhotosService {

  constructor(private config: ConfigService) {}

  async findAll() {
    const dir = join(this.config.STORAGE_ASSETS, 'photos');
    const files = await readdirAsync(dir);

    return files.map(name => join(this.config.PHOTOS_BASE_PATH, name));
  }

  async create(file: Express.Multer.File) {

    // TODO validate is photo

    const fileName = crypto
    .createHash('md5')
    .update(file.path)
    .digest('hex') + extname(file.originalname).toLowerCase();

    await renameAsync(file.path, join(this.config.STORAGE_PHOTOS, fileName));

    return {
      fileName,
    };
  }
  
  async createThumbs(filename: string) {

    const sourceFile = resolve(this.config.STORAGE_PHOTOS, filename);
    const destFile = resolve(this.config.STORAGE_THUMBS, filename);

    await sharp(sourceFile)
      .rotate()
      .resize(200, 200, { fit: 'cover', position: 'attention' })
      .jpeg({
        quality: 100,
      })
      .toFile(destFile);

    return {
      thumbName: destFile,
    };
  }

}
