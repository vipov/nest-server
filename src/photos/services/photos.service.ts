import { Injectable } from '@nestjs/common';
import { rename } from 'fs';
import { promisify } from "util";
const renameAsync = promisify(rename);
import { join, extname } from 'path';
import { ConfigService } from '../../config';
import { createHash } from 'crypto';

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
}
