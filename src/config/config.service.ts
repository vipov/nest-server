import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { resolve } from 'path';

@Injectable()
export class ConfigService implements OnModuleInit, OnModuleDestroy {
  readonly JWT_SECRET = process.env.JWT_SECRET;
  readonly TOKEN_HEADER_NAME = process.env.TOKEN_HEADER_NAME;

  readonly STORAGE_TMP =  resolve(__dirname, '../../storage/tmp');
  readonly STORAGE_PHOTOS =  resolve(__dirname, '../../storage/photos');
  readonly STORAGE_THUMBS = resolve(__dirname, '../../assets/photos');
  readonly PHOTOS_BASE_PATH = '/photos';
  readonly STORAGE_ASSETS = resolve(__dirname, '../../assets');
  readonly DB_NAME = resolve(__dirname, '../../storage/databases/db.sql');


  constructor() {
    // TODO validate config
    // console.log('ENV: JWT_SECRET', process.env.JWT_SECRET);
    // console.log('ENV: TOKEN_HEADER_NAME', process.env.TOKEN_HEADER_NAME);
    if(!this.JWT_SECRET) {
      throw new Error('Brak konfiga JWT_SECRET')
    }
  }
  onModuleDestroy() {
    // console.log('DESTROY Config')
  }
  async onModuleInit(): Promise<void> {
    // console.log('INIT Config')
  }
}
