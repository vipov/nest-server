import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { mkdirSync } from 'fs';
import { resolve, join, posix } from 'path';

@Injectable()
export class ConfigService implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {

  async onModuleInit() {
    if(!this.WORKER_PORT) {
      throw new Error('ConfigService.WORKER_PORT is required, check your .env setup');
    }
    mkdirSync(this.STORAGE_TMP, {recursive: true});
    mkdirSync(this.STORAGE_PHOTOS, {recursive: true});
    mkdirSync(this.STORAGE_ASSETS, {recursive: true});
    mkdirSync(this.STORAGE_THUMBS, {recursive: true});
  }

  async onModuleDestroy() {
    console.log('DESTROY')
  }

  async onApplicationShutdown(sig) {
    // console.log('SHUTDOWN', sig)
    await new Promise(resolve => {
      setTimeout(() => {
        console.log('SHUTTING DOWN DONE')
        resolve(1);
      }, 200);
    })
  }

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

  // TODO jak jesteśmy w dist zamieniamy src/ na ./
  readonly ORMCONFIG = {
    "type": "sqlite",
    "database": this.DB_NAME,
    "entities": [
      "src/**/*.entity.ts"
    ],
    "migrationsTableName": "migrations",
    "migrations": [
      "src/db/migrations/*.ts"
    ],
    "cli": {
      "migrationsDir": "src/db/migrations"
    }
  }
}
