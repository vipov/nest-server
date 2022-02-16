import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { resolve } from 'path';

export const joinUrl = (...paths) => paths.join('/');

@Injectable()
export class ConfigService implements OnModuleInit, OnModuleDestroy {
  readonly DEBUG = process.env.DEBUG === 'true';
  readonly PORT = process.env.PORT;
  readonly DOMAIN = process.env.DOMAIN;
  readonly STORAGE_DIR = resolve(process.env.STORAGE_DIR);
  readonly JWT_SECRET = process.env.JWT_SECRET;

  async onModuleInit() {
    // TODO implement validation & transformation of the config
  }
  async onModuleDestroy() {
    // TODO clean up
  }
}
