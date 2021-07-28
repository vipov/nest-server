import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { statSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export const joinUrl = (...paths) => paths.join('/');

@Injectable()
export class ConfigService implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {

  readonly DEBUG = process.env.DEBUG === 'true';
  readonly PORT = parseInt(process.env.PORT, 10);
  readonly DOMAIN = process.env.DOMAIN;
  readonly STORAGE_DIR = resolve(process.env.STORAGE_DIR);
  readonly JWT_SECRET = process.env.JWT_SECRET;

  // photos
  readonly STORAGE_TMP = resolve(this.STORAGE_DIR, 'tmp');
  readonly STORAGE_PHOTOS = resolve(this.STORAGE_DIR, 'photos');

  readonly STORAGE_ASSETS = resolve(this.STORAGE_DIR, 'assets');
  readonly STORAGE_THUMBS = resolve(this.STORAGE_ASSETS, 'thumbs');

  readonly PHOTOS_DOMAIN = this.DOMAIN;
  readonly PHOTOS_BASE_PATH = joinUrl(this.PHOTOS_DOMAIN, 'thumbs');
  readonly PHOTOS_DOWNLOAD_PATH = joinUrl(this.PHOTOS_DOMAIN, 'photos/download');


  async onModuleInit() {
    
    statSync(this.STORAGE_DIR);
    mkdirSync(this.STORAGE_TMP, {recursive: true});
    mkdirSync(this.STORAGE_PHOTOS, {recursive: true});
    mkdirSync(this.STORAGE_ASSETS, {recursive: true});
    mkdirSync(this.STORAGE_THUMBS, {recursive: true});
    
  }

  async onModuleDestroy() {
    // console.log('DESTROY ConfigService')
  }

  async onApplicationShutdown(signal?: string) {
    // console.log('SHUTDOWN ConfigService')

    // await new Promise(resolve => {
    //   console.log('SHUTDOWN START')
    //   setTimeout(() => {
    //     console.log('SHUTDOWN END')
    //     resolve(true);
    //   }, 2000);
    // });
  }
}
