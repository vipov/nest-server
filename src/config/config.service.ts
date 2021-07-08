import { Injectable } from '@nestjs/common';
import { resolve, join, posix } from 'path';

@Injectable()
export class ConfigService {
  readonly WORKER_PORT = parseInt(process.env.WORKER_PORT, 10);

  readonly JWT_SECRET = process.env.JWT_SECRET;
  readonly TOKEN_HEADER_NAME = process.env.TOKEN_HEADER_NAME;

  readonly STORAGE_TMP = resolve(__dirname, '../../storage/tmp');
  readonly STORAGE_PHOTOS = resolve(__dirname, '../../storage/photos');
  readonly STORAGE_THUMBS = resolve(__dirname, '../../storage/assets/photos');
  readonly STORAGE_ASSETS = resolve(__dirname, '../../storage/assets');
  readonly PHOTOS_DOMAIN = 'http://localhost:3000';
  readonly PHOTOS_BASE_PATH = [this.PHOTOS_DOMAIN, 'photos'].join('/');
  readonly PHOTOS_DOWNLOAD_PATH = [
    this.PHOTOS_DOMAIN,
    'api/photos/download',
  ].join('/');
  readonly DB_NAME = resolve(__dirname, '../../storage/db.sql');

}
