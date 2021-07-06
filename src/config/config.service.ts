import { Injectable } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ConfigService {
  readonly JWT_SECRET = process.env.JWT_SECRET;
  readonly TOKEN_HEADER_NAME = process.env.TOKEN_HEADER_NAME;

  readonly STORAGE_TMP =  resolve(__dirname, '../../storage/tmp');
  readonly STORAGE_PHOTOS =  resolve(__dirname, '../../storage/photos');
  readonly PHOTOS_BASE_PATH = '/photos';
  readonly STORAGE_THUMBS = resolve(__dirname, '../../storage/assets/photos');
  readonly STORAGE_ASSETS = resolve(__dirname, '../../storage/assets');

}
