import { Injectable, OnApplicationShutdown, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IsBoolean, IsEnum, IsFQDN, IsNotEmpty, IsNumber, isString, IsString, validate } from 'class-validator';
import { statSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export const joinUrl = (...paths) => paths.join('/');

export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

@Injectable()
export class ConfigService implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {

  @IsEnum(Env)
  @IsNotEmpty()
  readonly ENV = process.env.NODE_ENV

  @IsBoolean()
  @IsNotEmpty()
  readonly DEBUG = process.env.DEBUG === 'true';

  @IsNumber()
  @IsNotEmpty()
  readonly PORT = parseInt(process.env.PORT, 10);

  // @IsFQDN()
  @IsString()  
  @IsNotEmpty()
  readonly DOMAIN = process.env.DOMAIN;
   
  @IsString()
  @IsNotEmpty()
  readonly STORAGE_DIR = resolve(process.env.STORAGE_DIR);
  
  @IsString()
  @IsNotEmpty()
  readonly JWT_SECRET = process.env.JWT_SECRET;

  // photos
  readonly STORAGE_TMP = resolve(this.STORAGE_DIR, 'tmp');
  readonly STORAGE_PHOTOS = resolve(this.STORAGE_DIR, 'photos');

  readonly STORAGE_ASSETS = resolve(this.STORAGE_DIR, 'assets');
  readonly STORAGE_THUMBS = resolve(this.STORAGE_ASSETS, 'thumbs');

  readonly PHOTOS_DOMAIN = this.DOMAIN;
  readonly PHOTOS_BASE_PATH = joinUrl(this.PHOTOS_DOMAIN, 'thumbs');
  readonly PHOTOS_DOWNLOAD_PATH = joinUrl(this.PHOTOS_DOMAIN, 'photos/download');

  // DB
  readonly DB_NAME = resolve(this.STORAGE_DIR, 'db.sql');

  private async validate() {
    const errors = await validate(this, {});
    if(errors.length > 0) {
      throw new Error(errors.toString())
    }
  }

  async onModuleInit() {

    await this.validate();
    
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
